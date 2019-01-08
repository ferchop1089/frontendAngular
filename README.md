# FrontendAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

***************************************************************************************************************
Para tener en cuenta;

Errores y su solución (Spring)

1. Spring Maven clean error - The requested profile “pom.xml” could not be activated because it does not exist
	sln: clic derecho sobre el proyecto -> Propiedades -> Maven -> limpiar caja de texto -> aplicar y cerrar.
2. Instalar JBoss Tools
3. Instalar G9 Database Import para crear la entidades a partir de la base de datos
3. Las transacciones se empiezan y terminan a nivel de servicio, nunca a nivel de DAO

Instalación y Configuración de Angular

1. node.js
2. TypeScript
3. CLI Angular
4. mkdir crearCarpeta
5. cd crearCarpeta
6. ng new mi-proyecto
7. cd mi-proyecto
8. ng serve --open
9. ctrl + c para apagar el servidor abierto en el paso 8
10. Crear un componente en Angular: ng g/generate c/componente nombre-componente
11. Crear un servicio en Angular: ng g/generate s/service nombre-servicio
12. Para habilitar el escucha de TypeScript para compilar automaticamente de ts a js:
	ubicarse en el proyecto y tipear en consola: 
		tsc -init (enter)
		tsc -w

13. Los archivos orm.xml y jpa-named-queries.properties para agregar consultas personalizadas usando JPQL o SQL nativo deben ir en la carpeta META-INF. Si se cambia su ruta o nombre se debe especificar en la anotación @EnableJpaRepositories(namedQueriesLocation = "classpath:example.properties")
14. Al escribir el nombre de la consulta mapeada que está ya sea en el META-INF/jpa-named-queries.properties o el META-INF/orm.xml, escribir explicitamente la propiedad 'name' de la anotación @Query así;	
	// Correcto
	@Query(name = "Persona.findByEdades")
	public List<Persona> findByEdades(@Param("edad") Integer edad);

	// Incorrecto, genera un error de tipo org.hibernate.hql.internal.ast.QuerySyntaxException: unexpected token
	@Query("Persona.findByEdades")
	public List<Persona> findByEdades(@Param("edad") Integer edad);

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++ configurar git local
  git config --global user.email "you@example.com"
  git config --global user.name "Tu Nombre"


  …or create a new repository on the command line

echo "# backendSpring" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/ferchop1089/backendSpring.git
git push -u origin master

…or push an existing repository from the command line

git remote add origin https://github.com/ferchop1089/backendSpring.git
git push -u origin master
