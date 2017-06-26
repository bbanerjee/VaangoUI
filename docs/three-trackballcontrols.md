1) npm install save-dev three-trackballcontrols

2) mkdir node_modules/@types/three-trackballcontrols

3) cd node_modules/@types/three-trackballcontrols

4) cp ../three/three-trackballcontrols.d.ts ./index.d.ts

5) In index.d.ts, change

   class TrackballControls extends EventDispatcher {

   to  

   export class TrackballControls extends EventDispatcher {

6) In index.d.ts, at the end of the file

   declare module "three-trackballcontrols" {
     export = THREE.TrackballControls;
   }

7) cd ../three 

8) Edit index.d.ts and change

   /// <reference path="three-trackballcontrols.d.ts" />

   into a comment

   /* <reference path="three-trackballcontrols.d.ts" /> */

9) In the renderer code, use

   import TrackballControls = require('three-trackballcontrols');

10) In the renderer code, call

   new TrackballControls(camera);

   instead of

   new THREE.TrackballControls(camera);
