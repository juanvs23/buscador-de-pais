const origin=document.querySelector('#origen'),
    capital=document.querySelector('#capital'),
    banderaContent=document.querySelector('#bandera-content'),
    resultado=document.querySelector('#resultado');
   
      //listenner

      document.addEventListener('DOMContentLoaded',()=>{
        originLoad();
      });
      origin.addEventListener('change',()=>{
         countryGuide();
      })

      //functions
      const originLoad=()=>{
          let api='./js/json/country.json';
          let info=fetch(api)
          .then((res)=>{
              return res.json()
               
          })
          .then(res=>{
            let html=[
                {value: '', label: 'Seleccionar'}
            ];
            res.map((country,i)=>{
              html.push({value: country.name, label: country.name});
              
            })
            
            let choices = new Choices(origin,{
                noResultsText: 'No hay resultados',
                placeholder: true,
                itemSelectText: 'Seleccionar',
                placeholderValue: 'hola',
               
            });
            //console.log(html)
            choices.setChoices(html,
              'value',
              'label',
              false)
            
        })
          
         
          
      }

      const  countryGuide= async ()=>{
           let api=`https://restcountries.eu/rest/v2/name/${origin.value}`
         await  fetch(api)
           .then(res=>{
               return res.json();
           })
           .then(res=>{
            let data =res[0];
            console.log(data.latlng)   
            let flag=`<img src="${data.flag}" class="ten-din-img" alt="" >`,
                lat=data.latlng[0],
                long=data.latlng[1];
            banderaContent.innerHTML=flag
            capital.innerHTML=`<p><b>Capital:</b> ${data.capital}</p>
            <p><b>Moneda:</b> ${data.currencies[0].name}</p>
            <p><b>Población:</b> ${new Intl.NumberFormat("de-DE").format(data.population)} personas.</p>
            <p><b>Lenguaje:</b> ${data.languages[0].name }</p>
            `;
            mapboxgl.accessToken = 'pk.eyJ1IjoianVhbnZzMjMiLCJhIjoiY2s0enNrNDQxMGVuZjNtcWtlNmt4cnVtMyJ9.WQ76tdrY6bAIrnQZ7lvirQ';
                var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',center: [long, lat],
                zoom: 3
                });
            var marker = new mapboxgl.Marker()
                .setLngLat([long, lat])
                .addTo(map);
           })
           

       }