        var form = document.createElement('form');
        form.method = 'post';
        form.action = 'courseADD.php';
    let div= document.createElement('span');
     div.textContent= 'programs';
     document.body.appendChild(div);
div.style.backgroundColor='gray';
          fetch ('courseADD.php')//calling
          .then(response=>response.json())
          .then(program =>{
    programs.forEach(function(program,index){
    let input= document.createElement('input');
    let label = document.createElement('label');
     input.type= 'radio';
     input.name = 'program';
     input.id = 'radio' + (index+1);
     input.value = program;
label.textContent = program;
document.body.appendChild(label);
label.prepend(input);
  });
          });
  document.body.appendChild(form);
  form.appendChild(label);
  document.body.appendChild(document.createElement('br'));
     input.addEventListener('change', function(){
     let prompt = document.createElement('div');
     prompt.textContent=`enter how many years in the "${program}" program?` ;
    var yearinput=document.createElement('input');
    yearinput.type='number';
    prompt.appendChild(yearinput);
    document.body.appendChild(prompt);
     });
    const year_save =document.createElement('button');
    year_save = Number('yearinput.value')//?
        year_save.textContent= 'Next';
        year_save.type= 'submit';
       year_save.name= year_ok;
        let div = document.creatElement('div');
        document.body.appendChild(div);
div.appendChild(year_save);
div.appendChild(yearinput);
form.appendChild(div);
        Object.assign(div,{
      display:'flex'
      });
const label1=document.createElement('label');
const input1=document.createElement('input');
const input2=document.createElement('input')
input1.type='radio';
input1.value='same_sem';
label2.textContent=`each year same semester numbers`;
input2.type='radio';
input2.value='diff_sem'
div1.textContent=`each year different semester numbers`;
label1.prepend(input1);
label2.prepend(input2);
const label2=document.createElement('label');
document.body.appendChild(label1);
document.body.appendChild(label2);
form.appendChild(label1);
form.appendChild(label2);

//course input now looping sem and year
   input1.addEventListener('change',()=>{

   const label3= createElement('label')
   label3.textContent=`How many semster each year?`;
   input3 = createElement('input');
   input3.type='number';
   input3.name='sem_num';
   document.body.appendChild(label3);
   label3.prepend(input3);
   form.appendChild(label3);
  const sem_size=Number(input3.value);
     //reusing the var yearinput

     yearinput.forEach((y_size) ()=>{
          sem_size.forEach((sem_size)()=>{
         let label_course_num = document.createElement('label');
          label_course_num.textContent = `how many courses in + 'y_size'+'sem_size'?`;
           let input_course = document.createElement('input');
           input_course.type ='number';
           input_course.name = 'course_num';
           document.body.appendChild(label);
           label_course_num.prepend(input_course_num);
           form.appendChild(label_course_num);
          });
     });
     for(let i=0;i<course_num.value;i++)
     {
        //i used same let variable to reduce space that vairable takes as let can changed 
         let label_course = document.createElement('label');
    label_course.textContent= `enter course names `;
     let input_course = [document.createElement('input')];
       input_course.type = 'text' ;
       input_course.name = 'course_name[]';
        label_course.appendChild(input_course);
       form.appendChild(label_course);
     }
      let button = document.createElement('button');
      button.textContent= 'save';
      button.name='save';
      form.append('button', 'save');
     });
