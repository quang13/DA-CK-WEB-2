import { Component, OnInit, ViewChild, ElementRef, NgZone, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { MapsAPILoader, MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from '../../map/google-map.directive';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// import {LatLng as LatitudeLongitude} from "@molteni/coordinate-utils/dist/LatLng";

declare var google: any;
declare var jQuery: any;
@Component({
    selector: 'app-home, sebm-google-map',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [GoogleMapsAPIWrapper],
})
export class HomeComponent implements OnInit{
    public latitude: number;
    public longitude: number;
    public destinationInput: FormControl;
    public destinationOutput: FormControl;
    public zoom: number;
    public iconurl: string;
    public mapCustomStyles: any;
    public estimatedTime: any;
    public estimatedDistance: any;
    public address: string;
    public geoCoder;

    @ViewChild('search', { read: ElementRef, static: false})
    public searchElementRef: ElementRef;

    @ViewChild('pickupInput', { read: ElementRef, static: false})
    public pickupInputElementRef: ElementRef;

    @ViewChild('pickupOutput', { read: ElementRef, static: false})
    public pickupOutputElementRef: ElementRef;

    @ViewChild('scrollMe', { read: ElementRef, static: false})
    private scrollContainer: ElementRef;

    @ViewChild(DirectionsMapDirective, { read: DirectionsMapDirective, static: false}) vc: DirectionsMapDirective;

    @ViewChild('name', { read: ElementRef, static: false})
    public nameField: ElementRef;

    public origin: any; // its a example aleatory position
    public destination: any; // its a example aleatory position

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
            ) {
    }

    ngOnInit() {
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        //this.iconurl = '../image/map-icon.png';
        this.iconurl = '../image/map-icon.png';

        // this.mapCustomStyles = this.getMapCusotmStyles();
        //create search FormControl
        this.destinationInput = new FormControl();
        this.destinationOutput = new FormControl();
        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {

            this.geoCoder = new google.maps.Geocoder;

            let autocomplete = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
                types: ["address"]
            });

            let autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
                types: ["address"]
            });

            let autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
                types: ["address"]
            });

            this.setupPlaceChangedListener(autocompleteInput, 'ORG');
            this.setupPlaceChangedListener(autocompleteOutput, 'DES');
        });

        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    private setupPlaceChangedListener(autocomplete: any, mode: any) {
        autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
                //get the place result
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                //verify result
                if (place.geometry === undefined) {
                    return;
                }
                if (mode === 'ORG') {
                    this.vc.origin = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() };
                    this.vc.originPlaceId = place.place_id;
                } else {
                    this.vc.destination = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() }; // its a example aleatory position
                    this.vc.destinationPlaceId = place.place_id;
                }

                if (this.vc.directionsDisplay === undefined) {
                    this.mapsAPILoader.load().then(() => {
                        this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
                    });
                }

                //Update the directions
                this.vc.updateDirections();
                this.zoom = 12;
            });

        });

    }

    getDistanceAndDuration() {
        this.estimatedTime = this.vc.estimatedTime;
        this.estimatedDistance = this.vc.estimatedDistance;
    }

    scrollToBottom(): void {
        jQuery('html, body').animate({ scrollTop: jQuery(document).height() }, 3000);
    }

    private setPickUpLocation(place: any) {
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
            return;
        }
        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
                this.getAddress(this.latitude, this.longitude);
            });
        }
    }

    markerDragEnd($event: MouseEvent) {
        console.log($event);
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getAddress(this.latitude, this.longitude);
    }

    getAddress(latitude, longitude) {
        this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 12;
                    this.address = results[0].formatted_address;
                } else {
                    window.alert('Không tìm thấy địa chỉ bạn cần tìm');
                }
            } else {
                window.alert('Mã hoá không thành công: ' + status);
            }

        });
    }

    editname(): void{
      this.nameField.nativeElement.focus();
    }
}