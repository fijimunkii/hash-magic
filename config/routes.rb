HashMagic::Application.routes.draw do
  root to: 'wands#index'

  match '/max', to: 'versions#max'
  match '/sound', to: 'versions#sound'

  match '/display', to: 'displays#index'
  match '/display/listen', to: 'displays#listen'

  match '/wand', to: 'wands#index'
  match '/wand/trigger', to: 'wands#trigger'

end
