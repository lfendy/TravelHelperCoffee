
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :minify_js do
  path = './public/javascripts/'
  inputs = []
  Dir[File.expand_path(path)+('/**/**')].each do |path_to_js_file|
    inputs.push path_to_js_file
  end
  output = 'TravelHelper.min.js'
  system('juicer merge ' + inputs.join(' ') + ' --force -s -o ' + output)
end

task :default => [:minify_js]
