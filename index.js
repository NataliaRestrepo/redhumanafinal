const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

app.use(express.static(__dirname+"/public"));

app.use(require('body-parser').urlencoded({ extended: false}));

mongoose.connect("mongodb://localhost/prueba");

const Usuarios = mongoose.model("Usuarios",{
	nombre:String,
	clave:{type:String,required:true}
});

app.get("/borrar",(req,res)=>{
	Usuarios.deleteOne({_id:req.query.id},(error)=>{
		if(error)
		{
			res.send("Error al borrar");
		}	
		else
		{
			res.send("Usuario borrado correctamente <a href='/listar'>Volver</a>");
		}
	})
});

app.get("/listar",(req,res)=>{

	Usuarios.find((err,doc)=>{
		console.log(doc);
		console.log([0]);
		let html ="";
		let usuario;
		for (var i in doc)
		{
			usuario= doc [i];
			html+=`<span>${usuario.nombre}</span> 
				<a href="mailto:${usuario.clave}">${usuario.clave}</a> | `;
			html+=`<a href="/borrar?id=${usuario.id}">Borrar</a><br>`;
		}
		res.send(html);
	});
});	

app.get("/",(req,res)=>{
	console.log("Se le envia a la terminal de comandos");
	let html  = "<link rel='stylesheet' type='text/css' href='css/main.css'/>";
	html +="<h1>Hola mundo</h1>";
	res.send(html);

});

app.post("/grabar",(req,res)=>{
	new Usuarios(req.body).save().then(()=>{
		res.send("Usuario guardado con exito");
	});
});		

app.get("/registro",(req,res)=>{
	let formulario ="<link rel='stylesheet' type='text/css' href='css/main.css'/>";
	formulario += `<form action="/grabar" method="post">
			<label for="nombre">
		<section class="form-register">
				<a href=img/redhumana.png><img src="img/redhumana.png"width="90%"></a>
				<h1>Te Forma APP</h1>
		<h2>Inicio de sesión </h2>
			<input class="controls" type="text" name="nombre" id="nombre" placeholder="Ingrese su usuario"> <br> <br>
			<input class="controls" type="password" name="clave" id="clave" placeholder="Ingrese su contraseña"> <br> <br>
			<h3>Recordar contraseña</h3>
			<a href="perfil.html"><input class="botons" type="submit" value="Iniciar sesion"></a>
		</form>
	</label>`;
	res.send(formulario);
})

app.listen(port,()=>{
	console.log("Empezo el servidor");
});