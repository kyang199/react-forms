import React, {Component} from 'react';  

/* Import Components */
import CheckBox from '../components/CheckBox';  
import Input from '../components/Input';  
import TextArea from '../components/TextArea';  
import Select from '../components/Select';
import Button from '../components/Button';
import EditButton from '../components/EditButton'

class FormContainer extends Component {  

        state = {
            newUser: {
                name: '',
                amount: '',
                age: '',
                gender: '',
                skills: [],
                about: ''
            },

            genderOptions: ['Male', 'Female', 'Other'],
            skillOptions: ['Programming', 'Development', 'Design', 'Testing']

        }
    
    //this.handleTextArea = this.handleTextArea.bind(this);
    //this.handleAge = this.handleAge.bind(this);
    //this.handleFullName = this.handleFullName.bind(this);
    //this.handleFormSubmit = this.handleFormSubmit.bind(this);
    //this.handleClearForm = this.handleClearForm.bind(this);
    //this.handleCheckBox = this.handleCheckBox.bind(this);
    //this.handleInput = this.handleInput.bind(this);
    //}

  /* This lifecycle hook gets executed when the component mounts */
  
  handleFullName = e => {
       let value = e.target.value;
       this.setState( prevState => ({ newUser : 
        {...prevState.newUser, name: value
        }
      }), () => console.log(this.state.newUser))
    }

   handleAmount = e => {
        let value = e.target.value;
        this.setState(prevState => ({ newUser:
           {...prevState.newUser, amount: value
           }
       }), () => console.log(this.state.newUser))
   }

  handleAge = e => {
       let value = e.target.value;
       this.setState( prevState => ({ newUser : 
         {...prevState.newUser, age: value
         }
      }), () => console.log(this.state.newUser))
  }

  handleInput = e => {
       let value = e.target.value;
       let name = e.target.name;
       this.setState( prevState => ({ newUser : 
         {...prevState.newUser, [name]: value
         }
      }), () => console.log(this.state.newUser))
  }

  handleTextArea = e => {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser, about: value
      }
      }), () => console.log(this.state.newUser))
  }


  handleCheckBox = e => {

    const newSelection = e.target.value;
    let newSelectionArray;

    if(this.state.newUser.skills.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.skills.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.newUser.skills, newSelection];
    }

      this.setState( prevState => ({ newUser:
        {...prevState.newUser, skills: newSelectionArray }
      })
      )
}

  handleFormSubmit = e => {
    e.preventDefault();
    let userData = this.state.newUser;

      fetch('http://jsonplaceholder.typicode.com/comments',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          })
      }
    


    handleFormEdit = (e, id) => {
        e.preventDefault();
        let userData = this.state.newUser;

        fetch(`http://jsonplaceholder.typicode.com/comments/${id}`, {
            method: "PATCH",
            body: JSON.stringify(userData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => {
            res.json().then(data => {
                console.log("Successfully EDITED" + data);
            })
        })
    }



  handleClearForm = e => {
  
      e.preventDefault();
      this.setState({ 
        newUser: {
          name: '',
          age: '',
          gender: '',
          skills: [],
          about: ''
        },
      })
  }

    render() {

        const isEnabled =
            this.state.newUser.name.length > 0 &&
            this.state.newUser.age.length > 0;

    return (
        
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
       
            <Input inputType={'text'}
                   title= {'Full Name'} 
                   name= {'name'}
                   value={this.state.newUser.name} 
                   placeholder = {'Enter your name'}
                   handleChange = {this.handleInput}
                   required
            /> {/* Name of the user */}

            <Input inputType={'number'}
                title={'Amount'}
                name={'amount'}
                value={this.state.newUser.amount}
                placeholder={'Enter the amount'}
                handleChange={this.handleInput}            
            /> {/* Amount */}
        
          <Input inputType={'number'} 
                 name={'age'}
                 title= {'Age'} 
                 value={this.state.newUser.age} 
                 placeholder = {'Enter your age'}
                handleChange={this.handleAge}
            /> {/* Age */} 


          <Select title={'Gender'}
                  name={'gender'}
                  options = {this.state.genderOptions} 
                  value = {this.state.newUser.gender}
                  placeholder = {'Select Gender'}
                  handleChange = {this.handleInput}
                  /> {/* Age Selection */}
          <CheckBox  title={'Skills'}
                  name={'skills'}
                  options={this.state.skillOptions}
                  selectedOptions = { this.state.newUser.skills}
                  handleChange={this.handleCheckBox}
                   /> {/* Skill */}
          <TextArea
            title={'About you.'}
            rows={10}
            value={this.state.newUser.about}
            name={'currentPetInfo'}
            handleChange={this.handleTextArea}
            placeholder={'Describe your past experience and skills'} />{/* About you */}

            <Button 
                disabled={!this.isEnabled}
                action = {this.handleFormSubmit}
                type = {'primary'} 
                title = {'Submit'} 
                style={buttonStyle}
            /> { /*Submit */}

           <Button
                action={this.handleFormEdit}
                type={'primary'}
                title={'Edit'}
                style={buttonStyle}
            /> { /*Edit */}
          
          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}
          
        </form>
  
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}


export default FormContainer;