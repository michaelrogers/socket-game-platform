const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.55)'
  },
  content : {
    position                   : 'absolute',
    top                        : '20%',
    left                       : '40%',
    right                      : '40%',
    bottom                     : '20%',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
    zIndex                     : 1000,
    marginLeft                 : 'auto',
    marginRight                : 'auto',
    display                    : 'block'
  },
  button: {
    backgroundColor: "#fccf48",
    color: "#000"
  }
}

module.exports = customStyles;
