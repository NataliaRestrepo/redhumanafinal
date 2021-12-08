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

/*app.post("/grabar",(req,res)=>{
	new Usuarios(req.body).save().then(()=>{
		res.send("Usuario guardado con exito");
	});
});		*/

app.get("/registro",(req,res)=>{
	let formulario ="<link rel='stylesheet' type='text/css' href='css/main.css'/>";
	formulario += `<label for="nombre">
		<section class="form-register">
				<a href=img/redhumana.png><img src="img/redhumana.png"width="90%"></a>
				<h1>Te Forma APP</h1>
		<h2>Inicio de sesión </h2>
			<input class="controls" type="text" name="nombre" id="nombre" placeholder="Ingrese su usuario"> <br> <br>
			<input class="controls" type="password" name="clave" id="clave" placeholder="Ingrese su contraseña"> <br> <br>
			<h3>Recordar contraseña</h3>
			<a href="/perfil"><input class="botons" type="submit" value="Iniciar sesion"></a>
		</form>
	</label>`;
	res.send(formulario);
});


app.get("/perfil",(req,res)=>{
	let pantalla ="<link rel='stylesheet' type='text/css' href='css/perfil.css'/>"
	pantalla += `<head>
	<title>Red humana Te forma APP</title>
	<meta charset="utf-8">
	</head>
	<body>
		<section class="form-register">
				<a href=img/perfil.png><img src="img/perfil.png"width="30%"></a>
				<h1>Nombre</h1>
				<h1>Cargo</h1>
				<h1>Dependencia</h1>
			<br><br>
			<a href="/historial"><input class="botons" type="submit" value="Historial de cursos"><br> <br>
			<a href="/explorar"><input class="botons" type="submit" value="Explorar"> <br> <br>
			<a href="/comenzar"><input class="botons" type="submit" value="Comenzar curso"> </a><br> <br>
		</section>
	</body>
</html>`
		res.send(pantalla);
	});

app.get("/historial",(req,res)=>{
	let historial ="<link rel='stylesheet' type='text/css' href='css/historial.css'/>"
	historial +=`		<section class="form-register">
				<a href=img/historial.png><img src="img/historial.png"width="40%"> </a>
				<br><br>
				<br><br>
				<h1>-Puestos de pago</h1>
				<h1>-Gente con éxito</h1>
				<h1>-Seguridad en el trabajo</h1>
			<br><br>
			<input class="botons" type="submit" value="Atrás"><br> <br>	
		</section>`
		res.send(historial);
	});

app.listen(port,()=>{
	console.log("Empezo el servidor");
});
