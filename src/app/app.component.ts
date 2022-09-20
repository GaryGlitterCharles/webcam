import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
declare const gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
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
    navigator.permissions.query({name: permissionName})
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
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth;
    this.height = win.innerHeight;
  }
  public targetStyle(): any {
    let x = 100+ Math.random() * 100;
    let y = 100+ Math.random() * 100;
    return {
      'top': `${x}px`,
      'left': `${y}px`,
    }
  }
}
