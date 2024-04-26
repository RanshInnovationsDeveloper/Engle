

function StrongPasswordText({password}) {

    const getPasswordRequirements = () => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        const requirements = [
          { text: 'At least 12 characters long', satisfied: strongRegex.test(password) },
          { text: 'At least one lowercase letter', satisfied: /[a-z]/.test(password) },
          { text: 'At least one uppercase letter', satisfied: /[A-Z]/.test(password) },
          { text: 'At least one digit', satisfied: /\d/.test(password) },
          { text: 'At least one special character (@$!%*?&)', satisfied: /[@$!%*?&]/.test(password) }
        ];
        return requirements;
      };

  return (
    <div>
      <div className='flex flex-row justify-center'  >
            <div className="absolute z-20 bg-[#F4F6FC] -mt-4 px-3 py-2 rounded-xl shadow-lg "  style={{ left: `${Math.min((password? (password.length * 0.35)+40 : 40), 65)}%` }}>
            <div className="password-requirements">
          <span>Strong password requirements:</span>
          <ul>
          {getPasswordRequirements().map((requirement, index) => (
                <li key={index} style={{ color: requirement.satisfied ? 'green' : 'red' }}>{requirement.text}</li>
              ))}
          </ul>
        </div>
            </div>
              
            </div>
    </div>
  )
}

export default StrongPasswordText
