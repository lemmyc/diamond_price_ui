const labels = document.querySelectorAll('.dropdown__filter-selected')
    const toggles = document.querySelectorAll('.dropdown__switch')

    for (let label of labels) {

    

      let options = Array.from(label.parentElement.querySelectorAll('.dropdown__select-option'))
      options.forEach((option) => {
        option.addEventListener('click', () => {
          label.textContent = option.textContent
        })
      })
    }

    // Close dropdown onclick outside
    document.addEventListener('click', (e) => {
        
        // console.log(toggles)
        for (let toggle of toggles) {
          // console.log(toggle)
          const element = e.target
          // console.log(toggle)
          if (element == toggle) {
            for (let _toggle of toggles){
              if(_toggle != toggle){
                  _toggle.checked = false
              }
              
            }
            return;
          }

          const isDropdownChild = element.closest('.dropdown__filter')

          if (!isDropdownChild) {
            toggle.checked = false
          }
        }
      })