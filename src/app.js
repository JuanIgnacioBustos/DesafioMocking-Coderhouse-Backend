import express from 'express'

import handlebars from 'express-handlebars'

import __dirname from './utils.js'

import config from './config.js'

import routerProducts from './routes/products.router.js' 
import routerCarts from './routes/carts.router.js'
import routerMessages from './routes/messages.router.js'
import routerViews from './routes/views.router.js'
import routerSession from './routes/session.router.js'

import { Server } from "socket.io";

import ProductService from './services/products.service.js'
import MessageService from './services/messages.service.js'

import connectDB from './db.js'

import cookieParser from 'cookie-parser'

import passport from 'passport'
import initializePassportGithub from './config/github.passport.js'
import initializePassportLocal from './config/local.passport.js'
import { initializePassportJWT } from './config/jwt.passport.js'

// initial configuration

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static

app.use(express.static(__dirname + "/public"));

// handlebars configuration

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// cookies

app.use(cookieParser())

// passport

initializePassportGithub()
initializePassportLocal()
initializePassportJWT()
app.use(passport.initialize())

// server start and socket io

const expressServer = app.listen(config.PORT, () => console.log("Servidor levantado"))
const socketServer = new Server(expressServer)

socketServer.on("connection", async (socket) => {
  console.log("Estas conectado " + socket.id)

  //////////////// PRODUCTOS ////////////////

  let productService = new ProductService()

  // Se envian todos los productos al conectarse
  let products = await productService.getProducts()
  socket.emit("update-products", products.docs)

  // Se agrega el producto y se vuelven a renderizar para todos los sockets conectados
  socket.on("add-product", async (productData) => {
    await productService.addProduct(productData)
    
    products = await productService.getProducts()
    socketServer.emit("update-products", products.docs)
  })

  // Se elimina el producto y se vuelven a renderizar para todos los sockets conectados
  socket.on("delete-product", async (productID) => {
    await productService.deleteProduct(productID)

    products = await productService.getProducts()
    socketServer.emit("update-products", products.docs)
  })

  //////////////// MENSAJES ////////////////

  let messageService = new MessageService()

  // Se envian todos los mensajes al conectarse
  socket.emit("update-messages", await messageService.getMessages())

  // Se agrega el mensaje y se vuelven a renderizar
  socket.on("new-message", async (newMessage) => {

    await messageService.addMessage(newMessage)

    socketServer.emit("update-messages", await messageService.getMessages())
  })
})

// middleware (all requests have access to socket server)

app.use((req, res, next) => {
  req.socketServer = socketServer;
  next();
})

// routers

app.use("/", routerViews);

app.use("/api/messages", routerMessages);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use('/api/sessions', routerSession)