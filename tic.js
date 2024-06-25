//for access all buttons

let boxes= document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

// for tracking player x or player 0 create a new variable
let turn0=true;
//to track draw
let count=0;
  
 //store winning patterns in 2d array
 const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]];

    //add eventlistener for perform some action on click
    boxes.forEach((box) => {
        box.addEventListener("click",() =>{
            console.log("box was clicked");
         //we can store x,o text in box
         if(turn0){
            box.innerText="0";
            turn0=false;
         }
         else{
            box.innerText=("X");
            turn0=true;

         }
         box.disabled=true;
         count++;
         let isWinner = checkWinner();

         if (count === 9 && !isWinner) {
           gameDraw();
         } 
        });
       
    });

    const gameDraw = () => {
        msg.innerText = `Game was a Draw.`;
        msgContainer.classList.remove("hide");
        disableBoxes();
      };

      const disableBoxes = () => {
        for (let box of boxes) {
          box.disabled = true;
        }
      };
      
      const enableBoxes = () => {
        for (let box of boxes) {
          box.disabled = false;
          box.innerText = "";
        }
      };
    //create fuction for check  the winning pattern
    const checkWinner = () => {
        for (let pattern of winPatterns) {
          let pos1Val = boxes[pattern[0]].innerText;
          let pos2Val = boxes[pattern[1]].innerText;
          let pos3Val = boxes[pattern[2]].innerText;
      //check these pattern are not empty and also check equal or not

          if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
              showWinner( pos1Val);
              return true;
            }
          }
        }
      };
      //create new function for print winner
      const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
      };

      const resetGame = () => {
        turn0 = true;
        count = 0;
        enableBoxes();
        msgContainer.classList.add("hide");
      };
      
      newBtn.addEventListener("click", newGame);
     resetBtn.addEventListener("click", resetGame);