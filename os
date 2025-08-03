let array = [];
const direction = prompt("Enter direction Left or Right?")
const head = Number(prompt ("Enter head"));
const size = Number(prompt("Enter size of array"));
for (let i=0; i < size; i++) 
    {
    const element = Number(prompt("Enter element " + (i + 1)));
    array.push(element);
     }
functionone(direction,array,head,size);

function functionone (direction, array, head,size)
{
if(direction === "Left")
     {
        array.push(head);
array.sort((a, b) => a - b);
const min = array[0];
let arrayGreaterThanHead = [];
let i=0;
while (i< array.length) {
    if (array[i]>head)
        {
        arrayGreaterThanHead.push(array[i]+ " ");
    }
    i++;
}
document.getElementById("output").innerHTML += arrayGreaterThanHead + " ";
let j=0;
const newarray = [];
while (array[j]!==Number(head)&& j<array.length)
    {
        if (array[j]<Number(head))
        {
newarray.push(array[j]+ " ");
        }
j++;
}
let z = array.length-1;
let total_operations = 0;
 console.log(total_operations);
 for(let y=0;y<array.length;y++)
 {
console.log(array[y])
 }
let newsize= size+1;
let index = array.indexOf(head);//6
let k = index+1;//7
let m = 0;
       while(k<newsize)//7<8
       {
    total_operations += array[k]-array[index]; // value calculate.
    if(k==newsize-1)
    {
       total_operations += array[k]-array[m];
    }
    index++;//7
    k++;//VALUE 
    }
let n = 1;
    while (array[n]<head)
    {
    total_operations +=array[n]-array[m];
    m++;
    n++;
    }
    document.getElementById("total").innerHTML = total_operations ;
    console.log(total_operations);
}
     
const max = array[array.length-1];
const right = newarray.filter(function(r){
    return r>=head;
})
const left = newarray.filter(function(r){
    return r<head;
})
const sequence = [head, ...right.slice(1), ...left];
const canvas = document.getElementById('clookChart');
const ctx = canvas.getContext('2d');
const margin = 60;
const w = canvas.width - 2 * margin;// for equal margin and pixel size to draw on.
 const ybase=100;
 const ystep=30;
 function tracktox(t)
 {
   return margin + ((t-min)/(max-min))*w;

 }
 // x axis drawing
ctx.font="16px Arial";
ctx.beginPath(); //clears the drawing point
ctx.moveTo(margin,ybase);
ctx.LineTo(canvas.width-margin, ybase);
ctx.stroke();

//now, dash draw
newarray.forEach(t => { //iterates with temp variable
    let x = tracktox(t);//brings the t value in x as a x cordinate "the pixels value".
ctx.beginpath();
ctx.moveTo(margin,ybase);
ctx.LineTo(x,ybase-10)//verticle draw; 
ctx.stroke();
//num add above dash
ctx.fillText(t , x - 10,ybase-20);//fills the text according to the axis 
});

















}
