# Voting Service: votación sobre la blockchain de NEM

Proyecto utilizado en el Demo Day del Master en Blockchain de Tutellus para
facilitar el uso de una blockchain pública (NEM) y elegir el proyecto ganador
entre los asistentes, de forma democrática y descentralizada

## Configuración

Antes de arrancar el proyecto copiar `env.sample` a `.env`, lugar donde indicaremos
todas las variables de entorno del proyecto.

Las variable más importantes son:

* **ORIGIN_ADDRESS_PK**: Clave privada de la cuenta de NEM desde la que se
realizarán las transferencias
* **MAILCHIMP_LIST**: Identificador de la lista de Mailchimp donde se añade el
email del usuario
* **MAILCHIMP_API_KEY**: API válida de Mailchimp
* **POLL_ADDRESS**: Poll address que se visualiza
* **VALID_NEM_ADDRESS_PREFIX**: Prefijo de la NEM address T o N según estemos
trabajando con TESTnet o con MAINnet. (francamente mejorable)

En desarrollo: `npm run dev`

En producción: `npm run build && npm run start`
