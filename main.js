stateReducer = (state, action) => {
  switch(action.type){
    case 'inc' : return state + action.count
    case 'dec' : return state - action.count
    case 'reset' : return state - state
    
  }
}

class Store{
  constructor(state, stateReducer){
    this._state = state;
    this._stateReducer = stateReducer
    this._callbacks = []
  }
  
  get state(){
    return this._state
  }
  
  subscribe(callback){
    this._callbacks.push(callback)
  }
  
  update(action){
    this._state = this._stateReducer(this._state, action)
    this._callbacks.forEach(cb => cb())
  }
}

const store = new Store(0, stateReducer);

incAction = {
  type: 'inc',
  count: 1
}

decAction = {
  type: 'dec',
  count: 1
}

resetAction = {
  type: 'reset'
}
var el = document.querySelector('.root')
el.textContent = store.state;
store.subscribe(() => el.textContent = store.state)
document.querySelector('.btn-inc').addEventListener('click', function(){
  store.update(incAction)
})

document.querySelector('.btn-dec').addEventListener('click', function(){
  store.update(decAction)
})

document.querySelector('.reset').addEventListener('click', function(){
  store.update(resetAction)
})