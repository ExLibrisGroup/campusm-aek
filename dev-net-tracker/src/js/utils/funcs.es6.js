/*
-------------------------------------------------------------------
funcs.es6.js
-------------------------------------------------------------------

You can use a functions file to import functions into your
components. For this example, this file is being used to fill
content. 
*/

export function setLegend(label) {
  if (label === 'Pay Tuition') {
    return (
      <div>
        <div>
          complete: 0%
        </div>
        <div>
          incomplete: 100%
        </div>
      </div>
    );
  } else if (label === 'Apply to Scholarships') {
    return (
      <div>
        <div>
          complete: 100%
        </div>
        <div>
          incomplete: 0%
        </div>
      </div>
    );
  } else if (label === 'Complete Housing Reqs.') {
    return (
      <div>
        <div>
          complete: 66.7%
        </div>
        <div>
          incomplete: 33.3%
        </div>
      </div>
    );
  } else if (label === 'Complete FAFSA Reqs.') {
    return (
      <div>
        <div>
          complete: 33.3%
        </div>
        <div>
          incomplete: 66.7%
        </div>
      </div>
    );
  }
}

export function getGraphData() {
  const data = [
    {
      name: 'Pay Tuition',
      complete: 0 / 3,
      incomplete: 3 / 3
    }, {
      name: 'Apply to Scholarships',
      complete: 2 / 2,
      incomplete: 0 / 2
    }, {
      name: 'Complete Housing Reqs.',
      complete: 2 / 3,
      incomplete: 1 / 3
    }, {
      name: 'Complete FAFSA Reqs.',
      complete: 1 / 3,
      incomplete: 2 / 3
    }
  ];

  return data;
}

export function getData() {
  var items = [
    {
      name: "Pay Tuition",
      count: "0 of 3",
      complete: "no",
      oneTask: "no",
      tasks: [
        {
          name: "Sign up for your online school account",
          complete: "no",
          due: "01/01/17",
          detail: "Lorem ipsum yada yada"
        }, {
          name: "Accept opt in fees",
          complete: "no",
          due: "04/21/17"
        }, {
          name: "Pay your tuition fee",
          complete: "no",
          due: "09/11/17"
        }
      ]
    }, {
      name: "Apply to Scholarships",
      count: "2 of 2",
      complete: "yes",
      oneTask: "no",
      tasks: [
        {
          name: "Finish all scholarship applications",
          complete: "yes",
          due: "08/05/17",
          detail: "Lorem ipsum yada yada"
        }, {
          name: "Confirm you awards",
          complete: "yes",
          due: "09/11/17"
        }
      ]
    }, {
      name: "Complete Housing Tasks",
      count: "2 of 3",
      complete: "no",
      oneTask: "no",
      tasks: [
        {
          name: "Complete housing preferences",
          complete: "yes",
          due: "03/11/17",
          detail: "Take 1 of the following 2 courses, or any other approved Advanced College Writing course. M 429	History of Mathematics or M 499	Senior Thesis. Minimum Required Grade: C-."
        }, {
          name: "Pay application fee",
          complete: "yes",
          due: "06/12/17",
          detail: "Take all of the following courses: M 171, M 172, M 210, M 221, M 300, M 307."
        }, {
          name: "Complete roommate quiz",
          complete: "no",
          due: "09/13/17",
          detail: "Complete the General Education Requirement Group III: Modern and Classical Language."
        }
      ]
    }, {
      name: "Complete FAFSA Tasks",
      count: "1 of 3",
      complete: "no",
      oneTask: "no",
      tasks: [
        {
          name: "File before February 15th",
          complete: "no",
          due: "02/15/17",
          detail: "Lorem ipsum yada yada"
        }, {
          name: "Accept/Decline awards",
          complete: "no",
          due: "07/11/17"
        }, {
          name: "Create a student refund account",
          complete: "yes",
          due: "09/13/17"
        }
      ]
    }
  ];

  return items;
}
