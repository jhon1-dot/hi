// Helper to clear form for next steps
function clearElement(elem) {
  while (elem.firstChild) elem.removeChild(elem.firstChild);
}
// Main Form
const form = document.createElement('form');
form.method = 'POST';
form.action = 'courseADD.php';
document.body.appendChild(form);

// Step 1: Fetch programs and show radio options
function loadPrograms() {
  fetch('courseADD.php')
    .then(res => res.json())
    .then(programs => {
      const programsDiv = document.createElement('div');
      programsDiv.id = 'programsDiv';
      programsDiv.innerHTML = '<strong>Select a program:</strong><br>';
      programs.forEach((program, i) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'program_id';
        radio.value = program.id; // Use program_id as value
        radio.required = true;
        radio.onclick = () => askYears(program); // Pass the whole object for display
        label.appendChild(radio);
        label.appendChild(document.createTextNode(program.name)); // Show program_name as label
        programsDiv.appendChild(label);
        programsDiv.appendChild(document.createElement('br'));
      });
      clearElement(form);
      form.appendChild(programsDiv);
    });
}

// Step 2: Ask for number of years in selected program
function askYears(program) {
  clearElement(form);
  const yearsDiv = document.createElement('div');
  yearsDiv.id = 'yearsDiv';
  yearsDiv.innerHTML = `<strong>How many years in ${program.name}?</strong><br>`;
  const yearsInput = document.createElement('input');
  yearsInput.type = 'number';
  yearsInput.name = 'years';
  yearsInput.min = 1;
  yearsInput.required = true;
  yearsDiv.appendChild(yearsInput);

  // Only NEXT button, type=button, not submit!
  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.textContent = 'Next';
  nextBtn.onclick = () => {
    if (yearsInput.value && yearsInput.value > 0) {
      // Set hidden input for program_id
      let programInput = form.querySelector('input[name="program_id"]');
      if (!programInput)
         {
        programInput = document.createElement('input');
        programInput.type = 'hidden';
        programInput.name = 'program_id';
        programInput.value = program.id;
        form.appendChild(programInput);
      }
      // Set hidden input for years
      let yearsHidden = form.querySelector('input[name="years"]');
      if (!yearsHidden) {
        yearsHidden = document.createElement('input');
        yearsHidden.type = 'hidden';
        yearsHidden.name = 'years';
        form.appendChild(yearsHidden);
      }
      yearsHidden.value = yearsInput.value;
      askSemType(program, parseInt(yearsInput.value, 10));
    }
  };
  yearsDiv.appendChild(nextBtn);

  form.appendChild(yearsDiv);
}


// Step 3: Ask if semesters are same each year or different
function askSemType(program, years) {
  clearElement(form);
  const semTypeDiv = document.createElement('div');
  semTypeDiv.id = 'semTypeDiv';
  semTypeDiv.innerHTML = `<strong>Are semester numbers same or different each year?</strong><br>`;

  const labelSame = document.createElement('label');
  const radioSame = document.createElement('input');
  radioSame.type = 'radio';
  radioSame.name = 'sem_type';
  radioSame.value = 'same';
  labelSame.appendChild(radioSame);
  labelSame.appendChild(document.createTextNode('Same'));
  semTypeDiv.appendChild(labelSame);

  const labelDiff = document.createElement('label');
  const radioDiff = document.createElement('input');
  radioDiff.type = 'radio';
  radioDiff.name = 'sem_type';
  radioDiff.value = 'diff';
  labelDiff.appendChild(radioDiff);
  labelDiff.appendChild(document.createTextNode('Different'));
  semTypeDiv.appendChild(labelDiff);

  semTypeDiv.appendChild(document.createElement('br'));

  radioSame.onclick = () => askSameSem(years);
  radioDiff.onclick = () => askDiffSem(years);

  // Keep years data
  const yearsInput = document.createElement('input');
  yearsInput.type = 'hidden';
  yearsInput.name = 'years';
  yearsInput.value = years;
  form.appendChild(yearsInput);

  form.appendChild(semTypeDiv);
}

// Step 4A: Ask how many semesters per year (same for all years)
function askSameSem(years) {
  clearElement(form);
  const semDiv = document.createElement('div');
  semDiv.id = 'semDiv';
  semDiv.innerHTML = `<strong>How many semesters per year?</strong><br>`;
  const semInput = document.createElement('input');
  semInput.type = 'number';
  semInput.name = 'sem_num';
  semInput.min = 1;
  semInput.required = true;
  semDiv.appendChild(semInput);

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.textContent = 'Next';
  nextBtn.onclick = () => {
    if (semInput.value && semInput.value > 0) {
      askCoursesSame(years, parseInt(semInput.value, 10));
    }
  };
  semDiv.appendChild(nextBtn);

  // Keep sem_type
  const semTypeInput = document.createElement('input');
  semTypeInput.type = 'hidden';
  semTypeInput.name = 'sem_type';
  semTypeInput.value = 'same';
  form.appendChild(semTypeInput);

  form.appendChild(semDiv);
}

// Step 4B: Ask how many semesters per year (different for each year)
function askDiffSem(years) {
  clearElement(form);
  const diffDiv = document.createElement('div');
  diffDiv.id = 'diffDiv';
  diffDiv.innerHTML = `<strong>Enter number of semesters for each year:</strong><br>`;
  const semInputs = [];

  for (let y = 1; y <= years; y++) {
    const label = document.createElement('label');
    label.textContent = `Year ${y}: `;
    const input = document.createElement('input');
    input.type = 'number';
    input.name = `sem_num_year_${y}`;
    input.min = 1;
    input.required = true;
    semInputs.push(input);
    label.appendChild(input);
    diffDiv.appendChild(label);
    diffDiv.appendChild(document.createElement('br'));
  }
 
  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.textContent = 'Next';
  nextBtn.onclick = () => {
    // Validate all inputs
    const semCounts = semInputs.map(inp => parseInt(inp.value, 10));
    if (semCounts.every(n => n > 0)) {
      askCoursesDiff(years, semCounts);
    }
  };
  diffDiv.appendChild(nextBtn);

  // Keep sem_type
  const semTypeInput = document.createElement('input');
  semTypeInput.type = 'hidden';
  semTypeInput.name = 'sem_type';
  semTypeInput.value = 'diff';
  form.appendChild(semTypeInput);

  form.appendChild(diffDiv);
}

// Step 5A: Ask courses for each year/sem (same sem count)
function askCoursesSame(years, sem_num) {
  clearElement(form);
  const coursesDiv = document.createElement('div');
  coursesDiv.id = 'coursesDiv';
  coursesDiv.innerHTML = `<strong>Enter courses for each year & semester:</strong><br>`;

  // For each year and semester, ask for course number and names
  for (let y = 1; y <= years; y++) {
    for (let s = 1; s <= sem_num; s++) {
      const label = document.createElement('label');
      label.textContent = `How many courses in Year ${y}, Semester ${s}? `;
      const input = document.createElement('input');
      input.type = 'number';
      input.name = `course_num_y${y}_s${s}`;
      input.min = 1;
      input.required = true;
      label.appendChild(input);
      coursesDiv.appendChild(label);

      // When user enters course number, generate inputs for course names
      input.onchange = () => {
        // Remove previous course name inputs for this year-sem
        const prev = coursesDiv.querySelector(`#course_names_y${y}_s${s}`);
        if (prev) prev.remove();
        const courseNamesDiv = document.createElement('div');
        courseNamesDiv.id = `course_names_y${y}_s${s}`;
        for (let c = 1; c <= input.value; c++) {
          const cnLabel = document.createElement('label');
          cnLabel.textContent = `Course ${c} name: `;
          const cnInput = document.createElement('input');
          cnInput.type = 'text';
          cnInput.name = `course_name_y${y}_s${s}[]`;
          cnInput.required = true;
          cnLabel.appendChild(cnInput);
          courseNamesDiv.appendChild(cnLabel);
        }
        label.appendChild(courseNamesDiv);
      };
      coursesDiv.appendChild(document.createElement('br'));
    }
  }

  // Save button
  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.name = 'save';
  saveBtn.textContent = 'Save';
  coursesDiv.appendChild(saveBtn);

  form.appendChild(coursesDiv);
}

// Step 5B: Ask courses for each year/sem (different sem count)
function askCoursesDiff(years, semCounts) {
  clearElement(form);
  const coursesDiv = document.createElement('div');
  coursesDiv.id = 'coursesDiv';
  coursesDiv.innerHTML = `<strong>Enter courses for each year & semester:</strong><br>`;

  for (let y = 1; y <= years; y++) {
    const sem_num = semCounts[y - 1];
    for (let s = 1; s <= sem_num; s++) {
      const label = document.createElement('label');
      label.textContent = `How many courses in Year ${y}, Semester ${s}? `;
      const input = document.createElement('input');
      input.type = 'number';
      input.name = `course_num_y${y}_s${s}`;
      input.min = 1;
      input.required = true;
      label.appendChild(input);
      coursesDiv.appendChild(label);

      input.onchange = () => {
        const prev = coursesDiv.querySelector(`#course_names_y${y}_s${s}`);
        if (prev) prev.remove();
        const courseNamesDiv = document.createElement('div');
        courseNamesDiv.id = `course_names_y${y}_s${s}`;
        for (let c = 1; c <= input.value; c++) {
          const cnLabel = document.createElement('label');
          cnLabel.textContent = `Course ${c} name: `;
          const cnInput = document.createElement('input');
          cnInput.type = 'text';
          cnInput.name = `course_name_y${y}_s${s}[]`;
          cnInput.required = true;
          cnLabel.appendChild(cnInput);
          courseNamesDiv.appendChild(cnLabel);
        }
        label.appendChild(courseNamesDiv);
      };
      coursesDiv.appendChild(document.createElement('br'));
    }
  }
  // Save button
  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.name = 'save';
  saveBtn.textContent = 'Save';
  coursesDiv.appendChild(saveBtn);

  form.appendChild(coursesDiv);
}

// Load programs on page load
loadPrograms();

