###
# Compass
###

# Bootstrap
# First:
#    gem install sass-rails
#    gem install bootstrap-sass
require 'bootstrap-sass'
require 'json'


# Change Compass configuration
compass_config do |config|
#   config.output_style = :compact
  config.http_path = "/"
  config.images_dir = "img"
  config.javascripts_dir = "js"
end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

# Methods defined in the helpers block are available in templates
helpers do
  def layoutSingleGoat goatData
    str = JSON.generate(goatData)
    retStr = "<script>var goatJSON = #{str}</script>"
    retStr += "<script>goatPageLayout(goatJSON)</script>"
    #js = "<script>"
    #js += "var goat = {Description='#{goatData.description}',"
    #js += "status='#{goatData.status}',"
    #js += "profile_picture={large='#{goatData.profile_picture.large}',caption='#{goatData.profile_picture.caption}', medium='#{goatData.profile_picture.medium}', small='#{goatData.profile_picture.small}'},"
    #js += "goat={fullName='#{goat.fullName}',reg_num='#{goat.reg_num}',name='#{goat.name}',dob='#{goat.dob}',status='#{goat.status}',sex='#{goat.sex}',"
    #if goat.sire
    #  js+="sire='"
    #else
    #  js += "sire={}"
    #end
    #js += "}"
    #js +="}</script>"
  end
end

set :css_dir, 'stylesheets'

set :js_dir, 'js'

set :images_dir, 'img'

activate :directory_indexes

# Build-specific configuration
configure :build do

  activate :get_data

  # For example, change the Compass output style for deployment
  #Need to fix the minify
  #activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  set :http_path, "/img/"
end

activate :s3_sync do |s3_sync|
    s3_sync.bucket                     = 'maynesboergoats.com' # The name of the S3 bucket you are targetting. This is globally unique.
    s3_sync.region                     = 'us-east-1'     # The AWS region for your bucket.
    s3_sync.aws_access_key_id          = 'AKIAJJABRNKNKS6GYPCA'
    s3_sync.aws_secret_access_key      = 'gB2S9lU5ZNsMSDxrsTQSS+UMLzpv5XZKmyReUU2x'
    s3_sync.delete                     = true # We delete stray files by default.
    s3_sync.after_build                = false # We do not chain after the build step by default.
    s3_sync.prefer_gzip                = true
    s3_sync.path_style                 = true
    s3_sync.reduced_redundancy_storage = false
    s3_sync.acl                        = 'public-read'
    s3_sync.encryption                 = false
end
