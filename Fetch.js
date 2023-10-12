const backendurl = "" //Aca tienen que agregar la ruta raiz de su API

//Para todas las request el primer parametro (url) es el path donde esta el endpoint al que le quieran pegar
//ej: /api/auth/login o /api/users/getAll
//El segundo parametro (request) es el que van a usar para pasar la data,
//tiene que ser siempre un objeto.

//Recuerden que todas las funciones son async, asi que cuando las llamen desde sus componentes tienen que usar
//la palabra reservada 'await' (Exactamente como yo estoy llamando fetch en estas funciones).

//Aca les dejo un par de links de docu para que entiendan un poco mejor fetch en general
//Fetch: https://developer.mozilla.org/es/docs/Web/API/Fetch_API
//Promesas: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise (Si le pegan una leida, van a ver que no solo se usa para httpRequest, tiene muchos mas usos).
//JSON https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify Les dejo puntualmente el stringify que es el que usamos aca. Pero tiene otros metodos que tampoco esta de mas que chusmeen.


//Les dejo comentadas algunas cositas dentro de las funciones, no voy a tomarles nada teorico. Con que sepan usarlo es suficiente (Tenemos 14 clases en total)
//pero les va a servir aunque sea chusmear un poco y entender como es que funciona cada cosa, no queda otra que quemarse el bocho un rato!
export async function POST(url, request){
    
    return await fetch(backendurl + url, {
        method:'POST', //Method es la palabra que vamos a usar GET, POST, PUT, PATCH, DELETE https://developer.mozilla.org/es/docs/Web/HTTP/Methods
        mode:'cors', //El mode, Cross-Origin Resource Sharing https://developer.mozilla.org/es/docs/Web/HTTP/CORS
        headers:{ //Este es el campo de los headers https://developer.mozilla.org/es/docs/Web/HTTP/Headers
            'Content-Type':'application/json', //Aca se indica en que formato vamos a mandar encodeada la data que esta, en este caso (POST) en el body. Linea 27 https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || '' //Aca voy a pasar (si existe) mi JWT (Es el token que vieron hoy en clases)
        },
        body: JSON.stringify(request) //Aca le digo que pasar en el body, Chusmeen el link que esta en la linea 14
    })
    .then((res) => res.json()) //Esto es un metodo de la respuesta, transformo en un objeto lo que me devuelve la api https://developer.mozilla.org/en-US/docs/Web/API/Response/json
    .then((res) => res) //Aca unicamente aprovechamos la propiedad de las arrow function (lambda) para poder retornar lo que hicimos en la linea de arriba en una sola linea (Es por sintaxis, se podria hacer tranquilamente todo en una funcion normal con su return explicito)
    .catch((err) => err); //Si en cualquier parte del proceso anterior hay un error, entra este bloque y lo devuelve a la funcion en donde ustedes llamaron a POST()
}


export async function GET(url, request = null){

    let uri = "";
    if(request){
        uri = '?' + new URLSearchParams(request).toString(); //Esta funcion sirve para encodear el objeto de request para poder pasarlo directamente en la url. En DELETE van a ver que esta igual. https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    }

    return await fetch(backendurl + url + uri, {
        method:'GET',
        mode:'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || ''
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

export async function PATCH(url, request){

    return await fetch(backendurl + url, {
        method:'PATCH',
        mode:'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || '',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(request)
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

export async function DELETE(url, request){

    let uri = "";
    if(request){
        uri = '?' + new URLSearchParams(request).toString();
    }

    return await fetch(backendurl + url + uri, {
        method:'DELETE',
        mode:'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || ''
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}


//Este puntualmente se usa para subir archivos, no le den mucha bola por ahora!
export async function POSTU(url, file){

    let data = new FormData();
    data.append('file', file);

    return await fetch(backendurl + url, {
        method:'POST',
        mode:'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || ''
        },
        body: data
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}