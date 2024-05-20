const checkBoxList = document.querySelectorAll(".custom-checkbox")
const inputFields = document.querySelectorAll(".goal-input")
const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')
const allQuotes = [
   'Raise the bar by Completing your Goals',
   'Well begun is half-done',
   'Just  a step away, Keep going',
   'Whao! You just completed all the goals, time for chill :D',
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
   first : {
      name: '',
      completed: false,
   },
   second : {
      name: '',
      completed: false,
   },
   third : {
      name: '',
      completed: false,
   },

}
   // const allGoals={}
const completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length;
progressValue.style.width = `${completedGoalsCount /3 * 100}%`
progressValue.innerText = `${completedGoalsCount}/3 Completed`
// console.log(completedGoalsCount)
progressLabel.innerText = allQuotes[completedGoalsCount]

checkBoxList.forEach((checkbox)=>{
            checkbox.addEventListener('click',()=>{
               const allGoalsAdded = [...inputFields].every(function(input){
                  // console.log(allFieldFilled)
                  return input.value
               })
              
              if(allGoalsAdded){

               checkbox.parentElement.classList.toggle('completed')
              
               const inputId = checkbox.nextElementSibling.id
               // console.log(input)
               allGoals[inputId].completed= !allGoals[inputId].completed
               const completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length;
                console.log(completedGoalsCount)
               progressValue.style.width = `${completedGoalsCount /3 * 100}%`
                progressValue.innerText = `${completedGoalsCount}/3 Completed`
                progressLabel.innerText = allQuotes[completedGoalsCount]
               localStorage.setItem('allGoals',JSON.stringify(allGoals))

               console.log(allGoals[inputId])
            }else{
               progressBar.classList.add('show-error')
            }
          })
})

inputFields.forEach((input)=>{
   
   input.value = allGoals[input.id].name

   if(allGoals[input.id].completed){
      input.parentElement.classList.add('completed')
   }

   input.addEventListener('focus',()=>{
      progressBar.classList.remove('show-error')
   })
   input.addEventListener('input',(e)=>{
      
      if(allGoals[input.id].completed){
        input.value = allGoals[input.id].name
        return
      }
  
      allGoals[input.id].name=input.value
       
      
      localStorage.setItem('allGoals',JSON.stringify(allGoals))
})
})