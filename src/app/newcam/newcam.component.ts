import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-newcam',
  templateUrl: './newcam.component.html',
  styleUrls: ['./newcam.component.scss']
})
export class NewcamComponent implements OnInit, AfterViewInit {

  public multipleWebcamsAvailable = false;
  public trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  webcamWidth: any;
  webcamHeight: any;
  sOrentation: any;
  // videoOrenW: any;

  public facingMode: string = 'environment';

  public errors: WebcamInitError[] = [];

  constructor(private elementRef: ElementRef, private router: Router) {
    this.sOrentation = window.matchMedia("(orientation: portrait)");
  }

  ngAfterViewInit(): void {
    // setting background color of the screen to Gray
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'rgb(163, 168, 168)';
  }

  public webcamImage: WebcamImage | undefined;
  ngOnInit(): void {

   // if (this.sOrentation.matches) {
      // If the Orentation is portrait
      this.webcamHeight = 350;
      this.webcamWidth = 350;
      // this.videoOrenW = 120;
    // } else {
    //   // If the Orentation is Landscape
    //   this.webcamHeight = 200;
    //   this.webcamWidth = 300;
    //   // this.videoOrenW = 270;
    // }

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

  }


  retakephoto() {
    this.webcamImage = undefined;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  // @HostListener('window:orientationchange', ['$event'])
  // onOrientationChange($event: any) {
  //   // If there are matches, we're in portrait
  //   if (!this.sOrentation.matches) {
  //     this.webcamHeight = 400;
  //     this.webcamWidth = 400;
  //     this.videoOrenW = 120;
  //   } else {
  //     // Landscape orientation
  //     this.webcamHeight = 200;
  //     this.webcamWidth = 300;
  //     this.videoOrenW = 270;
  //   }
  // }

  toOldCom() {
    this.router.navigate(['gary']);
  }

  public get videoOptions(): MediaTrackConstraints {
    //you can set ideal,min,max for width and height
    const result: MediaTrackConstraints = {
      width: { max: 640, ideal: 1920 },
      height: { min: 480, ideal: 1080 }
    };
    // to show back camera by default
    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }
    return result;
  }


  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }


  rotateCamera(cameraRotation: boolean | string): void {
    this.nextWebcam.next(cameraRotation)
  }

}



