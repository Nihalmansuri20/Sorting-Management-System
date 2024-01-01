//define the global array for sorting .
let blocksContainer = document.getElementById("blockContainer") ;
let indicator = document.querySelector(".indicator")
let arr = [] ;
let selectsort = document.getElementById("selectSort") ;

//indicators declaration 
let div1 = document.createElement("div");
let div2 = document.createElement("div") ;
let div3 = document.createElement("div") ;
let div4 = document.createElement("div") ;

let p1 = document.createElement("p");
let p2 = document.createElement("p");
let p3 = document.createElement("p");
let p4 = document.createElement("p");

p1.classList.add("circle");
p2.classList.add("circle");
p3.classList.add("circle"); 
p4.classList.add("circle"); 

let l1 = document.createElement("label");
let l2 = document.createElement("label");
let l3 = document.createElement("label");
let l4 = document.createElement("label");

//now generate the bloks 
blockGenerator() ;

//Update the range in html
document.getElementById("rangeUpdate").defaultValue=50;
function updateRange(val){
    document.getElementById("displayRange").innerText = val;
}

//Update the speed in html and set the delay 
document.getElementById("speedUpdate").defaultValue=2;
let delay = 5000 ;
function updateSpeed(val){
    document.getElementById("displaySpeed").innerText = String(val)+"x" ;
   // console.log(val);
    switch(val){
        case "1" :
            delay=10000;
            break;
        case "2" :
            delay=3000;
            break;
        case "3" :
            delay=1000;
            break;
        case "4" :
            delay=500;
            break;
        case "5" :
            delay=200;
            break;
        case "6" :
            delay=50;
            break;
    }
}

function inProcess(){
    document.getElementById("selectSort").disabled = true ;
    document.getElementById("rangeUpdate").disabled = true ;
    document.getElementById("arrayGenerator").disabled = true ;
    document.getElementById("start").disabled = true ;
}

function outProcess(){
    document.getElementById("selectSort").disabled = false;
    document.getElementById("rangeUpdate").disabled = false ;
    document.getElementById("arrayGenerator").disabled = false ;
    document.getElementById("start").disabled = false ;
}
//
function blockGenerator(){
    //clean the old array and blocks .
    arr = [] ;
    blocksContainer.innerText="" ;
    //now retrive the range of blocks . and set the block width out of 100 .
    let ran = Number(document.getElementById("rangeUpdate").value) ;
    let blockwidth =  100 / ran  ;

    //now generate the blocks and add into the html 
    for(let i=0;i<ran;i++){

        //random number from 10 to 99 
        let randomnum = Math.floor(Math.random()*90)+10 ;
        arr.push(randomnum);

        //create the block division .then add the class to block 
        let newblock = document.createElement("div") ;
        newblock.classList.add("blockStyle");
        newblock.innerText=String(randomnum);
        newblock.style.width= (String(blockwidth)+"%") ;
        newblock.style.height= (String(randomnum*5) + "px") ;

        //now append this block to specific container .
        blocksContainer.appendChild(newblock);


    }
   // console.log(arr) ;
}

function start(){
    let sortalgo = selectsort.value;
 //   console.log(sortalgo);
    if(sortalgo=="B"){
        BubbleSort() ;
        threeIndicator() ;
    }
    else if(sortalgo=="I"){
        InsertionSort() ;
        insertionIndicator();
    }
    else if(sortalgo=="S"){
        SelectionSort();
        threeIndicator() ;
    }
    else if(sortalgo == "M"){
        MergeSort();
        mergeIndicator() ;
    }
    else if(sortalgo=="Q"){
        QuickSort() ;
        fourIndicator() ;
    }
}

function swap(elem1,elem2){
    return new Promise( (resolve) => {
        elem1.style.backgroundColor="red";
        elem2.style.backgroundColor="red" ;

        window.requestAnimationFrame(function(){
           setTimeout(()=>{
                blocksContainer.insertBefore(elem2,elem1);
                resolve();
           },delay); 
        });
    });
 
}
async function BubbleSort(){

    //diable appropriate buttons 
    inProcess() ;

    let blocks = document.querySelectorAll(".blockStyle") ;
    for(let i=0;i<blocks.length;i+=1){
        for(let j=0;j<blocks.length-i-1;j++){
            blocks[j].style.backgroundColor = "orange" ;
            blocks[j+1].style.backgroundColor= "orange" ;

            //now set timeout
            await new Promise((resolve) =>
                setTimeout(()=>(resolve()),delay)
            );

            let value1 = blocks[j].innerText ;
            let value2 = blocks[j+1].innerText;

            if(value1>value2){
                await swap(blocks[j],blocks[j+1]);
                blocks = document.querySelectorAll(".blockStyle");
            }

            blocks[j].style.backgroundColor = "#990099" ;
            blocks[j+1].style.backgroundColor= "#990099" ;


        }
        blocks[blocks.length-i-1].style.backgroundColor= "#009a2b";

    }
    for(let i=0;i<blocks.length;i++){
        blocks[i].style.backgroundColor = "#009a2b";
    }

    outProcess() ;
}

async function SelectionSort(){

    inProcess() ;
    //color combination 
    //sorted part : green , selected elements : orange , swap :red 

    let blocks = document.querySelectorAll(".blockStyle") ;
    let n = blocks.length ; 

    for(let i=0 ;i<n;i++){

        let min_idx = i ; 
        let val1,val2 ; 

        for(let j=i+1;j<n;j++){

            blocks[min_idx].style.backgroundColor = "orange" ;
            blocks[j].style.backgroundColor = "orange" ;
            await new Promise((resolve)=>
                setTimeout(()=>(resolve()),delay)
            );
            
            
            val1 = arr[min_idx] ;
            val2 = arr[j] ;

            
            blocks[min_idx].style.backgroundColor = "#990099" ;
            blocks[j].style.backgroundColor = "#990099" ;
            if(val2<val1){
                min_idx = j ; 
            }


            
        }

        //now minimum index is found perform the swap operation 
        blocks[min_idx].style.backgroundColor="red" ;
        blocks[i].style.backgroundColor="red" ;

        await new Promise((resolve)=>
            setTimeout(()=>(resolve()),delay)
        );
        //swapping the block 
        let temp = blocks[min_idx].style.height ;
        let txt = blocks[min_idx].innerText ;
        blocks[min_idx].style.height=blocks[i].style.height ;
        blocks[min_idx].innerText = blocks[i].innerText ;
        blocks[i].style.height = temp ;
        blocks[i].innerText = txt ;

        //sort the array 
        [arr[min_idx],arr[i]] = [arr[i],arr[min_idx]] ;

        blocks[i].style.backgroundColor="#009a2b" ;
        blocks[min_idx].style.backgroundColor = "#990099" ;
        await new Promise((resolve)=>
            setTimeout(()=>(resolve()),delay)
        );

    }
    for (var i = 0; i < n; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 10)
        );
        blocks[i].style.backgroundColor = "#009a2b";
    }

    outProcess() ;

}
async function InsertionSort(){
    inProcess() ;

    //color combinations : selection : orange , swap :red , sorted : green 
    let blocks = document.querySelectorAll(".blockStyle") ;
    let n = blocks.length ; 

    for(let i=1 ; i<n ;i++){

        let key = arr[i] ;
        const height = blocks[i].style.height ;
        const txt = blocks[i].innerText ;
       // console.log("befor in j ");
        

        // so here we have to insert the key at position on sorted array . 
        let j=i-1 ;
        while(j>=0 && arr[j] > key){

            //shifting all the elements . 
            arr[j+1]=arr[j];
          //  console.log(j);

            blocks[j+1].style.backgroundColor="orange" ;
            blocks[j].style.backgroundColor="orange" ;
            await new Promise((resolve)=>
                setTimeout(()=>(resolve()),delay)
            );       
            
            blocks[j+1].style.height=blocks[j].style.height;
            blocks[j+1].innerText = blocks[j].innerText ;
      
            blocks[j+1].style.backgroundColor="#990099" ;
            blocks[j].style.backgroundColor="#990099" ;
            j--;
        }
       // console.log("outside while loop");
        arr[j+1]=key ;
        
        
        blocks[j+1].style.height=height;
        blocks[j+1].innerText = txt ;


        blocks[j+1].style.backgroundColor="#009a2b";


    }
    outProcess() ;
}

async function shift(blk1,blk2){

  //  console.log("aayo") ;

    blk1.style.backgroundColor = "orange" ;
    blk2.style.backgroundColor = "orange" ;
    await new Promise((resolve)=>
            setTimeout(()=>(resolve()),delay)
    );
  //  console.log("DElay"+delay);

    blk1.style.height=blk2.style.height ;
    blk1.innerText = blk2.innerText ;

    blk2.style.backgroundColor="#990099" ;
    blk1.style.backgroundColor="#990099" ;
}

async function MergeSort(){

    inProcess() ;
    //color combination --> orange-> merging and sorting . green -> sorted. 

    let blocks = document.querySelectorAll(".blockStyle") ;
    let n = blocks.length ;

    //let defining the array with the sizes of order 2 .
    //so every time the size of the array would be double . 
    for(let curr_size=1; curr_size<=n-1; curr_size=curr_size*2){
        
        //pick the starting point of differenct subbarrays of curr_size .
        for(let left_start=0 ; left_start<n-1 ; left_start += 2*curr_size){

            let from = left_start ;
            //finding the ending point of the left subarray where mid+1 is starting point of right 
            let mid = Math.min(left_start+curr_size-1 , n-1) ;
            
            let to = Math.min(left_start + 2*curr_size -1 , n-1) ;

            //now we are having two arrays let just merge this arrays . 
            let i1 = from , j1=mid+1 , k=from ;

            //let difine temporary array . 
            let temp = [] ;

            while(i1 <= mid && j1 <= to){

                if(arr[i1] < arr[j1] ){
                    temp[k] = arr[i1] ;
                    i1++ ;
                    k++ ;
                }
                else {
                    temp[k] = arr[j1] ;
                    j1++ ;
                    k++ ;
                }
            }

            //now copy the remaining elements 
            while(i1<n && i1<=mid ){
                temp[k] = arr[i1] ;
                i1++ ;
                k++ ;
            }

            while(j1<=to && j1<n){
                temp[k] = arr[j1] ;
                j1++;
                k++ ;
            }

           // console.log("before array : "+arr) ;
            //update the our main array from temp array 
            for(let x = from ; x<=to ;x++){

                //finally update the main array 
                arr[x] = temp[x] ;
                blocks[x].style.backgroundColor = "orange" ;
                blocks[x].style.height = String(temp[x]*5)+"px" ;
                blocks[x].innerText = String(temp[x]) ;

            }
           // console.log("after arr :  "+arr) ;
            await new Promise((resolve) => 
                setTimeout(()=> (resolve()) , delay )
            );

            for(let i=0;i<n;i++){
                blocks[i].style.backgroundColor = "#990099" ;
            }

            //lets update the blocks array . 
            blocks = document.querySelectorAll(".blockStyle") ;


        }
    }

    for(let i =0 ;i<n ;i++){
        blocks[i].style.backgroundColor = "#009a2b";
    }
    outProcess() ;
}



async function QuickSort(){
    inProcess() ;
    //select all the blocks 
    let blocks = document.querySelectorAll(".blockStyle");
    let n = blocks.length ;
    let top = -1 ; 
    let stack = [] ;

    //push the indexed on the stack 
    stack[++top]=0 ;
    stack[++top]=n-1 ;

    //running the loop till stack is empty . 
    while(top>=0){

        //now first pop the elements for reference the arrays pointers left and right . 
        let h = stack[top--];
        let l = stack[top--];

        //initialize the pivot in order to make partition. which is right most element .
        let pivot = arr[h] ;

        blocks[h].style.backgroundColor="blue" ;

        let pivotText = blocks[h].innerText ;
        blocks[h].innerText=pivotText+"\npivot"
        await new Promise((resolve)=>
            setTimeout(()=>(resolve()),700)
        );

        //now reset the pivot innertext 
        blocks[h].innerText = pivotText ;

        // i is helping to the partition . 
        let i = l-1 ; 
        //now make the partition 
        //color combinatition --> i&j = orange , swap = red , swap pivot&i = blue .
        for(let j=l; j<h; j++){

            blocks[i+1].style.backgroundColor="orange";
            blocks[j].style.backgroundColor="orange";

            await new Promise((resolve)=>
            setTimeout(()=>(resolve()),delay)
        );
            //we find the elements those are less than pivot and arranging the array and replace by the i .
            if(arr[j]<=pivot){
                i++ ;
                //now swapping occurs btw i & j . 
                blocks[j].style.backgroundColor="red";
                blocks[i].style.backgroundColor="red" ;

                await new Promise((resolve)=>
                    setTimeout(()=>(resolve()),delay)
                );
                //swapping in the blocks 
                let temp = blocks[i].style.height ;
                let txt = blocks[i].innerText ;
                blocks[i].style.height=blocks[j].style.height;
                blocks[i].innerText=blocks[j].innerText;
                blocks[j].style.height=temp ;
                blocks[j].innerText=txt ;

                //let's update the array 
                [arr[i],arr[j]]=[arr[j],arr[i]];
              //  console.log("after swapping the i&j"+arr);

                
                blocks[i].style.backgroundColor="#990099";
            }
            blocks[j].style.backgroundColor="#990099";

        }

        //now we find that left side of the i all elements are small from pivot 
        // and right side all the elements are bigger than pivot so put pivot in actual location .
        let p = i+1 ;
        blocks[p].style.backgroundColor = "red";
        blocks[h].style.backgroundColor = "red";

        await new Promise((resolve)=>
            setTimeout(()=>(resolve()),delay)
        );

        //swapping occur pivot and i+1 that is p.
        //swapping in the blocks 
        let temp = blocks[p].style.height ;
        let txt = blocks[p].innerText ;
        blocks[p].style.height=blocks[h].style.height;
        blocks[p].innerText=blocks[h].innerText;
        blocks[h].style.height=temp ;
        blocks[h].innerText=txt ;

        //let's update the array 
        [arr[p],arr[h]]=[arr[h],arr[p]];
      //  console.log("after swaaping the pivot"+arr) ;

        //hurray :|) partition successfully completed . 
        // let's update the partition indices on stack for further proccessing . 
        //left partition if its more than three elements 
        if(p-1 > l){

            stack[++top]=l;
            stack[++top]=p-1 ;

        }
        if(p+1 < h){
            stack[++top]=p+1;
            stack[++top]=h;
        }
        blocks[p].style.backgroundColor="#009a2b";
        await new Promise((resolve)=>
            setTimeout(()=>(resolve()),delay)
        );


    }

    
    for (var i = 0; i < n; i++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 10)
        );
        blocks[i].style.backgroundColor = "#009a2b";
    }

    outProcess() ;

}

function threeIndicator(){

    div3.style.display="block" ;

    indicator.appendChild(div1);
    indicator.appendChild(div2);
    indicator.appendChild(div3);


    p1.style.backgroundColor="orange" ;
    p2.style.backgroundColor="red" ;
    p3.style.backgroundColor="#009a2b";

    l1.innerText = "Selected" ;
    l2.innerText = "Swap" ;
    l3.innerText = "Sorted" ;

    div1.appendChild(p1);
    div1.appendChild(l1) ;

    div2.appendChild(p2);
    div2.appendChild(l2);

    div3.appendChild(p3);
    div3.appendChild(l3) ;

}

function insertionIndicator(){

    div3.style.display="none" ;
    div4.style.display="none" ;
    indicator.appendChild(div1);
    indicator.appendChild(div2) ;

    p1.style.backgroundColor = "orange";
    p2.style.backgroundColor = "#009a2b" ;

    l1.innerText="Selected" ;
    l2.innerText="inserted" ;

    div1.appendChild(p1);
    div1.appendChild(l1);

    div2.appendChild(p2);
    div2.appendChild(l2);
}
function mergeIndicator(){
    insertionIndicator() ;
    l1.innerText="merging&sorting" ;
    l2.innerText="sorted" ;
}
function fourIndicator(){


    threeIndicator() ;
    div4.style.display="block" ;

    indicator.appendChild(div4);

    p4.style.backgroundColor = "blue" ;
    l4.innerText="Pivot" ;


    div4.appendChild(p4);
    div4.appendChild(l4); 
    
}