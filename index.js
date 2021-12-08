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

app.get("/explorar",(req,res)=>{
	let explorar ="<link rel='stylesheet' type='text/css' href='css/explorar.css'/>"
	explorar +=`	<section class="form-register">
				<a href=img/explorar.png><img src="img/explorar.png"width="40%"></a>
				<br><br>
				<br><br>
				<h1>¿Que hay por aprender?</h1>
				<h1>Descubre tus funciones</h1>
				<h1>Relacionado a tu cargo</h1>
			<br><br>
			<input class="botons" type="submit" value="Atrás"><br> <br>	
		</section>`	
		res.send(explorar);
	});

 app.get("/comenzar",(req,res)=>{
	let comenzar ="<link rel='stylesheet' type='text/css' href='css/comenzar.css'/>"
	comenzar +=`<section class="comenzar">
		<h2>Puestos de pago</h2>
				<br>
				<br>
				<br>
			<a href="descrpcion.html"><input class="botons" type="submit" value="Descripción de tareas"></a>
				<br>
				<br>
			<a href="interfaz.html"><input class="botons" type="submit" value="Interfaz de puestos de pago"></a>
				<br>
				<br>
			<a href="simulador.html"><input class="botons" type="submit" value="Simulador"></a>	
		
	</section>`
		res.send(comenzar);
	});

 app.get("/comenzar",(req,res)=>{
	let comenzar ="<link rel='stylesheet' type='text/css' href='css/comenzar.css'/>"
	comenzar +=`<section class="comenzar">
		<h2>Puestos de pago</h2>
				<br>
				<br>
				<br>
			<a href="/descrpcion"><input class="botons" type="submit" value="Descripción de tareas"></a>
				<br>
				<br>
			<a href="/interfaz"><input class="botons" type="submit" value="Interfaz de puestos de pago"></a>
				<br>
				<br>
			<a href="/simulador"><input class="botons" type="submit" value="Simulador"></a>	
		
	</section>`
		res.send(comenzar);
	});

 app.get("/descrpcion",(req,res)=>{
	let descrpcion ="<link rel='stylesheet' type='text/css' href='css/descrpcion.css'/>"
	descrpcion +=`<section class="form-register">
				<a href=img/descripcion.png><img src="img/descripcion.png"width="40%"></a>
				<br><br>
				<br><br>
				<h1>Generalidades</h1>
				<h1>¿Qué hacer en un puesto de pago?</h1>
				<h1>Funciones</h1>
				<h1>Actividades en registro</h1>
				<br><br>
			<input class="botons" type="submit" value="Atrás"><br> <br>	
		</section>`
		res.send(descrpcion);
	});

 app.get("/interfaz",(req,res)=>{
	let interfaz ="<link rel='stylesheet' type='text/css' href='css/interfaz.css'/>"
	interfaz +=`<style type="text/css">
			h1
			{
			color: black;
			font-family: 'calibri';
			font-size: 15px;
			text-align: left;
			}
		</style>

		
		<section class="form-register">
			<h1>LUNES A VIERNES 8:00 AM 9:00 PM</h1>
				<h2 href=img/Captura.PNG><img src="img/Captura.PNG"width="70%"></h2>
				<h2>Identificador operador:</h2>
				<h2>Contraseña:</h2>
		</section>

		<div style="text-align: center;">
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">7</button>
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">8</button>
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">9</button>
   	 	<button style="position: center;top: 40%;height:40px; width:65px;type="button" name="btnprueba">BORRAR</button>
		</div>

		<div style="text-align: center;">
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">6</button>
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">5</button>
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">4</button>
   	 	<button style="position: center;top: 40%;height:40px; width:65px;type="button" name="btnprueba">DATOS</button>
		</div>

		<div style="text-align: center;">
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">3</button>
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">2</button>
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">1</button>
   	 	<button style="position: center;top: 40%;height:40px; width:65px;type="button" name="btnprueba">ATRAS</button>
		</div>

		<div style="text-align: center;">
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">.</button>
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">0</button>
   	 	<button style="position: center;top: 40%;height:40px; width:50px;type="button" name="btnprueba">00</button>
   	 	<button style="position: center;top: 40%;height:40px; width:65px;type="button" name="btnprueba">ENTRAR</button>
		</div><br>

		<div style="text-align: center;">
   	 	<button style="position: left;top: 40%;height:50px; width:150px;type="button" name="btnprueba">CAMBIARCONTRASEÑA</button>
   	 	<button style="position: rigth;top: 40%;height:50px; width:100px;type="button" name="btnprueba">IZQUIERDA</button>
		</div>`
		res.send(interfaz);
	});
app.listen(port,()=>{
	console.log("Empezo el servidor");
});
