interface MarkerNeeded {
  name?: string;
  companyName?:string
  location: {
    lat: number,
    lng:number
  }
}

export class CustomMap {
  private googleMap: google.maps.Map;
  private elem: HTMLElement;
  
  constructor(elemId:string) {
    this.elem = document.querySelector(elemId)!,
    this.googleMap =  new google.maps.Map(this.elem, {
        zoom: 1,
        center: {
          lat: 0 , 
          lng: 0
        }
          
      }
    )
    
  }
  addMarker(item:MarkerNeeded):void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat:item.location.lat,
        lng: item.location.lng
      }
    })
    marker.addListener("click", () => {
      const userInfoText = `this is ${item.name || item.companyName} <br/> location : ${item.location.lat + " " + item.location.lng}`
      const infoWindow = new google.maps.InfoWindow({
        content: userInfoText,
      })
      
      infoWindow.open(this.googleMap, marker)      
      
      this.googleMap.addListener("click", () => {
        infoWindow.close()
      })
      

    })

  }

}