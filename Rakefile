
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :minify_js do
  path = 'public/javascripts/'
  inputs = []
  inputs.push path + 'jquery-1.6.1.js'
  inputs.push path + 'mustache.js'
  inputs.push path + 'TravelHelper.js'
  output = path + 'TravelHelper.min.js'
  system('juicer merge ' + inputs.join(' ') + ' -s -o ' + output)
end

task :default => [:minify_js]
