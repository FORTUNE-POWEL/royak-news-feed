





  // document.getElementById('vote_button').style.display = 'none';
        let radios;
     
        
        axios.get('https://api.royalgospelmusic.com/radios/get_all')
            .then(response => {
                // console.log(response)
                radios = response.data.radios;
let radio_html = '';
                // console.table(categories);
                for (radio of radios) {
                 

                    
                    
 radio_html += `
 <div class="index_article1_a12 mb-3">
                <div id="${radio.id}">
                    <img src="${radio.image}" style="width:80px; height:80px; object-fit:cover;  border: 1px solid #FBD263; border-radius:10%">
                    <div class="ml-2">
                        <small style="font-size:14px;">${radio.title}</small>
                    </div>
                </div>

                <div>
                   
                     <button id="radio-btn${radio.id}"class="btn btn-primary btn-sm mr-2" onclick="onClickRadio('${radio.url},${radio.id}')">Listen </button>
                    
                    
                </div>
            </div>
`;
                  
                    document.getElementById('category_spinner').style.display = 'none';
                    // document.getElementById('vote_button').style.display = 'flex';
                    // document.getElementById('vote_button').style.display = 'block';


                }
                
                  document.getElementById('all_radios').innerHTML += `
<div data-aos="fade-up" data-aos-duration="600" style="border:2px solid #FBD263; padding:10px; border-radius: 20px; background-color: #050239;" class="container mb-4">
            <h6 class="text-center mb-4 mt-3" style="color:#DFB951; font-weight:bold;">Stream Live Radios</h6>
            <!-- <br> -->
            ${radio_html}

        </div>
        

`;


            })
            .catch(error => console.log(error));
            
            
       

        function onClickRadio(arguments_sent){
            let url = arguments_sent.split(",")[0];
            let station_id = arguments_sent.split(",")[1];
            
            // first check if there is no radio
            if(localStorage.getItem('currentRadio')===null){
            localStorage.setItem('currentRadio',station_id);    
            }
            
            var myAudio = document.getElementById('my-audio');
            var source = document.getElementById('my-audio-source');
            source.src = url;
            myAudio.load();
            myAudio.play();
            
         
            
            if(localStorage.getItem('currentRadio')!=station_id){
                // this is another playing station
                
                // first set its button to listen
                 let previous_radio_button_listen = `radio-btn${localStorage.getItem('currentRadio')}`;
                document.getElementById(previous_radio_button_listen).innerHTML ="Listen";
                
                let radio_button_listen = `radio-btn${station_id}`;
                document.getElementById(radio_button_listen).innerHTML ="On-Air 🔊";
                // now set current playing radio to this one 
                 localStorage.setItem('currentRadio',station_id);    
            }else{
                // alert("we are here");
                 let radio_button_listen = `radio-btn${station_id}`;
                document.getElementById(radio_button_listen).innerHTML ="On-Air 🔊";
            }
            
                 axios.get(`https://www.api.royalgospelmusic.com/radios/add_stream?station_id=${station_id}`)
            .then(response => {
                console.log(response.data.message);
            })
            
        }


   