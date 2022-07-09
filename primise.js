const p0 = new Promise( (resolutionFunc,rejectionFunc) => {
    console.log("LOL0");
    resolutionFunc(0);
});
p0
  .then( (val) => console.log("el registro asíncrono tiene val:") );