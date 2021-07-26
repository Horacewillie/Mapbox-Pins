import './formfield.css'

const FormField = ({formData, change, id}) => {
    const showError = () => {
        let errorMessage = "";
        if (formData.validation && !formData.valid) {
          errorMessage = (
            <div className="error_label">{formData.validationMessage}</div>
          );
        }
        return errorMessage;
      };

    const renderTemplate = () => {
        let formTemplate  = null;
        switch(formData.element){
            case 'input' :
                formTemplate = (
                    <div className="formBlock">
                        <input type="text"
                        className = 'inputArea' 
                        value={formData.value}
                        onBlur={(e) => change({ e, id, blur: true })}
                        onChange={(e) => change({ e, id })}
                        {...formData.config}
                        />
                        {showError()}
                    </div>
                )
            break;

            default: 
               formTemplate = null;
               break
        }
        return formTemplate;
    }
    return (
        <div>
           {renderTemplate()} 
        </div>
    )
}

export default FormField