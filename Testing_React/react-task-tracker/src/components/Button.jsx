import PropTypes from 'prop-types'

const Button = ({color,text,onClick}) => {
    return (
        <button style={{backgroundColor:color}} onClick={onClick} className='btn'>
            {text}
        </button>
    )
}

Button.defaultProps = {
    color:'steelblue', 
    text:'Btn',
}
Button.prototype = {
    color: PropTypes.string,
    onClick : PropTypes.func,
    text: PropTypes.string,
}

export default Button
