<template>
    <body>
  <section class="form" id="app">
    <form  class="flexbox-container">
        <div class="flexbox-item-photo" >
            <img v-bind:src="this.photo" id="photo" alt="Avatar" class="avatar"/>
 

        </div>
        <div class="flexbox-item-name" >
            <input type="text" id="editName" placeholder="Vorname" v-model="firstName" class="form-control-name" readonly>
            <input type="text" id="editLastname" placeholder="Nachname" v-model="lastName"  class="form-control-name" readonly>
        </div>
        <div class="flexbox-item-email">
            <input type="email" id="editEmail" placeholder="E-Mail-Adresse"  v-model="eMail" class="form-control-email" readonly>
        </div>
        <div class="flexbox-item-address">
            <input type="text" id="editStreet"  placeholder="Strasse" v-model="street"  class="form-control-address1" readonly>
            <input type="number" id="editHsnr" placeholder="HsNr" v-model="streetNumber" class="form-control-address" readonly>
        </div>
        <div class="flexbox-item-place">
            <input type="text" id="editPlz"  placeholder="Plz" v-model="postCode" class="form-control-ort1" readonly>
            <input type="text" id="editOrt"  placeholder="Ort" v-model="city" class="form-control-ort" readonly>
        </div>
        <button v-if="prikazi_prvi" v-on:click="fetchPeople" class="btnUser">User generieren</button>
        <button v-if="prikazi_drugi" v-on:click="doSmth" class="btn-user2">User generieren</button>
        
   
        <button v-if="prikazi_bearbeiten" v-on:click="mojaFunkcija" class="btn-user-bearbeiten">User bearbeiten</button>
        <button v-if="prikazi_anlegen" v-on:click="userMod" class="btn-user-anlegen">User anlegen</button>
        
        

         <button v-if="prikazi_speichern" v-on:click="userBearbeiten" class="btn-user-speichern">User speichern</button>
         <button v-if="prikazi_abbrechen" v-on:click="doSmth"  class="btn-user-abbrechen">User abbrechen</button>

    </form>
  </section>




</body>
</template>

<script>
const endpoint = "https://randomuser.me/api/?results=";
 
export default {
    data: () => {
        return {
            people: null,
            imageLink: "@/assets/avatar_img2.jpg" ,   
            prikazi_prvi: true,
            prikazi_drugi: false,
            prikazi_bearbeiten: false,
            prikazi_anlegen: false,
            prikazi_speichern: false,
            prikazi_abbrechen:false,
           // isBearbeitet: false
          

        }
    },
    
    computed: {
        firstName(){
            if(this.people && this.people.name && this.people.name.first){
                return this.people.name.first;
            }
            return '';
        },
        lastName(){
            if(this.people && this.people.name && this.people.name.last){
                return this.people.name.last;
            }
            return '';
        }, 
        eMail(){
            if(this.people && this.people.email){
                return this.people.email;
            }
            return '';
        },
          street(){
            if(this.people && this.people.location && this.people.location.street.name ){
                return this.people.location.street.name;
            }
            return '';
        },
         streetNumber(){
            if(this.people && this.people.location && this.people.location.street.number){
                return this.people.location.street.number;
            }
            return '';
        },
           postCode(){
            if(this.people && this.people.location && this.people.location.postcode ){
                return this.people.location.postcode;
            }
            return '';
        },
         city(){
            if(this.people && this.people.location && this.people.location.city ){
                return this.people.location.city;
            }
            return '';
        },
          photo(){
            if(this.people && this.people.picture && this.people.picture.medium ){
                return this.people.picture.medium;
            }
            return '@/src/assets/avatar_img2.jpg';
            // vrati staticko sliku 
        },
      
    },
  /*  watch: {
     
        people: {
           handler(newPeople){
            localStorage.people=JSON.stringify(newPeople);
        },
        deep:true
        },
      
      
    },*/
    methods: {
        fetchPeople(event){
            event.preventDefault();
            this.$http.get(endpoint)
            .then((response)=>{
                if (response.data && response.data.results && response.data.results.length > 0){
                    this.people=response.data.results[0] || null;
                  //  localStorage.setItem('people',JSON.stringify(this.people));
            
                }
                console.log("api response", this.people);
            })
            .catch((err)=> {
                console.log(err);
            });
           this.prikazi_prvi = false
           this.prikazi_drugi = true
        },
      doSmth(event){
        event.preventDefault();
       
              this.prikazi_drugi = false;
              this.prikazi_bearbeiten = true
              this.prikazi_anlegen = true

           
        },
        mojaFunkcija(event){
           event.preventDefault();
           document.getElementById("editName").readOnly=false;
           document.getElementById("editLastname").readOnly=false;
           document.getElementById("editEmail").readOnly=false;
           document.getElementById("editOrt").readOnly=false;
           document.getElementById("editPlz").readOnly=false;
           document.getElementById("editStreet").readOnly=false;
           document.getElementById("editHsnr").readOnly=false;
           this.prikazi_bearbeiten = false
           this.prikazi_anlegen =false
           this.prikazi_abbrechen=true
           this.prikazi_speichern=true
        },
        userMod(){
             localStorage.setItem('people',JSON.stringify(this.people));
             localStorage.setItem('isOrg',0)
             localStorage.removeItem('isBearbeitet')
        },
        userBearbeiten (){
    //     console.log("isBearbeitet1" + this.isBearbeitet);
 // this.isBearbeitet=!this.isBearbeitet;
  //  console.log("isBearbeitet2" + this.isBearbeitet);
            let myObj =
 {
       "name": {
        
        "first": document.getElementById("editName").value,
        "last": document.getElementById("editLastname").value
      },
      "location": {
        "street":{
            "name":document.getElementById("editStreet").value,
            "number":document.getElementById("editHsnr").value,
        },
        "city": document.getElementById("editOrt").value,   
        "postcode":document.getElementById("editPlz").value,   
        },
      "email":  document.getElementById("editEmail").value,
      "picture": {
    
        "medium":this.people.picture.medium
      }                    
      
  };
     
     localStorage.setItem('neu', JSON.stringify(myObj));
     localStorage.setItem('isBearbeitet',1)
           
        }
       
     
       
    },
 mounted: function() {
 //   event.preventDefault();
 //console.log("nove"+this.isBearbeitet);
    if (localStorage.isBearbeitet){
       if(localStorage.neu){
            this.people=JSON.parse(localStorage.neu);
        }
        else {
           this.fetchPeople();

        }
    } else {
         if(localStorage.people){
            this.people=JSON.parse(localStorage.people);
        }
        else {
           this.fetchPeople();

        }
       // (this.isBearbeitet) ? this.people=JSON.parse(localStorage.neu) :  this.people=JSON.parse(localStorage.people)
    }

   
  }, 
 
       
    

        
 
}
</script>


