const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
 
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'home.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.



function buttonClicked(){
  
  let brand = document.getElementById("brand").value // user input value of brand//
  let category = document.getElementById("category").value  // user input value of brand//

   fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${category}`)
    .then(response => response.json())
    .then(data => {
      let html = "";
      if(data){
        data.forEach(data => {
          html += `
          
          <div class="" data-id = "${data.id}">
            <form action="" class="form">
              <h2 style="font-size:20px ;" id="">${data.name}</h2>
              <br>
        
              <div id="">Price:$ ${data.price}</div>
              <br>
        
              <div id="">Product Type: ${data.category} </div>
              <br>
        
              <div id="">Rating⭐️: ${data.rating} </div>
              <br>
        
              <div  style="text-align: justify;" id="">Description: ${data.description}</div>
              <br>
        
              <div id="">Product Link: ${data.product_link}</div>
              <br><br><br>
            </form>
          </div>
        
         
          `;
        })
    } else{
      html = "We're verry sorry but the product you want not available";
    }
    document.getElementById("data").innerHTML = html;
  });
}

