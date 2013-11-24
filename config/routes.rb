HashMagic::Application.routes.draw do
  root to: 'welcome#index'

  match '/display/listen', to: 'displays#listen'

  match '/wand/trigger', to: 'wands#trigger'

end
