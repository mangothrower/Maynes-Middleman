# Require core library
require "middleman-core"
require 'net/http'
require 'json'
require 'yaml'

# Extension namespace
class GetData < ::Middleman::Extension
  option :my_option, "default", "An example option"

  def initialize(app, options_hash={}, &block)
    # Call super to build options from the options_hash
    super

    # Require libraries only when activated
    # require 'necessary/library'

    # set up your extension
    # puts options.my_option
    allDoes = Net::HTTP.get('maynesboergoats.goatpages.com', '/farm_goats.json?sex=doe&public=true')
    allBucks = Net::HTTP.get('maynesboergoats.goatpages.com', '/farm_goats.json?sex=buck&public=true')
    mainDoes = Net::HTTP.get('maynesboergoats.goatpages.com', '/farm_goats.json?sex=doe&status=1&public=true')
    mainBucks = Net::HTTP.get('maynesboergoats.goatpages.com', '/farm_goats.json?sex=buck&status=1&public=true')
    
    File.write("data/mainDoes.json", mainDoes)
    File.write("data/mainBucks.json",mainBucks)
    File.write("data/allDoes.json", allDoes)
    File.write("data/allBucks.json", allBucks)
    
    jsonDoes = JSON.parse(allDoes)
    jsonBucks = JSON.parse(allBucks)
    
    
    
    jsonBucks.each do |buck|
      buckYaml= buck.to_yaml 
      file_string = buckYaml + "---\n<%= partial 'goatLayout'%> <%= layoutSingleGoat current_page.data %>"
      File.write("source/Bucks/"+buck["goat"]["reg_num"]+ ".html.erb", file_string)
    end
    
    jsonDoes.each do |doe|
      doeYaml = doe.to_yaml
      file_string = doeYaml + "---\n<%= partial 'goatLayout'%> <%= layoutSingleGoat current_page.data%>"
      File.write("source/Does/"+doe["goat"]["reg_num"]+".html.erb",file_string)
    end
    
  end

  def after_configuration
    # Do something
  end

  # A Sitemap Manipulator
  # def manipulate_resource_list(resources)
  # end

  # module do
  #   def a_helper
  #   end
  # end

end

# Register extensions which can be activated
# Make sure we have the version of Middleman we expect
# Name param may be omited, it will default to underscored
# version of class name

::Middleman::Extensions.register(:get_data, GetData)
