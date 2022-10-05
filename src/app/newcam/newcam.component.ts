import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
  webcamWidth: any;
  webcamHeight: any;
  sOrentation: any;
  // public videoOptions: MediaTrackConstraints = {
  //    width: {ideal: 1000},
  //    height: {ideal: 1000}
  // };
  public errors: WebcamInitError[] = [];
  constructor(private elementRef: ElementRef) {
    // screen.orientation.lock('portrait-primary');
    this.sOrentation = window.matchMedia("(orientation: portrait)");
    console.log(this.sOrentation);

    // this.webcamHeight = 430;
    // this.webcamWidth = 400;
    // if (this.sOrentation) {
    //   this.webcamHeight = 430;
    //   this.webcamWidth = 275;
    // }
  }
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'rgb(163, 168, 168)';
  }
  public webcamImage: WebcamImage | undefined;
  ngOnInit(): void {
    this.webcamHeight = 430;
    this.webcamWidth = 275;
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

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange($event: any) {
    // If there are matches, we're in portrait
    if (!this.sOrentation.matches) {
      console.log('portrait - ' + this.sOrentation.matches)
      this.webcamHeight = 430;
      this.webcamWidth = 275;
    } else {
      // Landscape orientation
      this.webcamHeight = 200;
      this.webcamWidth = 300;
      console.log('Landscape')
    }
  }
}
