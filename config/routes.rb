HashMagic::Application.routes.draw do
  root to: 'welcome#index'

  match '/display/listen/:id', to: 'displays#listen'

  match '/wand/trigger/:id', to: 'wands#trigger'

  get '/:id', to: 'welcome#trigger'

end
