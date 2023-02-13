import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
declare const gtag: Function;
@Component({
  selector: 'app-oldcam',
  templateUrl: './oldcam.component.html',
  styleUrls: ['./oldcam.component.scss']
})
export class OldcamComponent implements OnInit {

  title = 'webcam';
  private width: number = 0;
  private height: number = 0;
  public multipleWebcamsAvailable = false;
  public trigger: Subject<void> = new Subject<void>();
  public webcamImage: WebcamImage | undefined;
  public errors: WebcamInitError[] = [];
  constructor(public router: Router, private elementRef: ElementRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-N0KGWY6Y4V', { 'page_path': event.urlAfterRedirects });
      }
    })
  }
  // linear-gradient(to left, rgb(253, 200, 47), rgb(255, 161, 0) 100%)
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'rgb(163, 168, 168)';
  }
  ngOnInit(): void {
    const permissionName = "camera" as PermissionName;
    navigator.permissions.query({ name: permissionName })
      .then((permissionObj) => {
        console.log(permissionObj.state);
        var video = document.querySelector('video');
      })
      .catch((error) => {
        console.log('Got error :', error);
      })

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      })
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  retakephoto() {
    this.webcamImage = undefined;
  }

  public get videoOptions(): MediaTrackConstraints {
    //you can set ideal,min,max for width and height
    const result: MediaTrackConstraints = {
      width: { max: 120, ideal: 1920 },
      height: { max: 200, ideal: 1080 }
    };
    return result;
  }

}
