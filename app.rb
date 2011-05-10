require 'sinatra'

set :public, File.dirname(__FILE__) + '/static'

require 'rubygems'
require 'open-uri'
require 'net/http'

get '/' do
  erb :index
end

get '/js/*.js' do
  params[:splat]
end

get '/file/*' do |file|
  def fetch(file, limit = 10)
    # You should choose better exception.
    raise ArgumentError, 'HTTP redirect too deep' if limit == 0

    response = Net::HTTP.get_response(URI.parse(file))
    case response
    when Net::HTTPSuccess     then response
    when Net::HTTPRedirection then fetch(response['location'], limit - 1)
    else
      response.error!
    end
  end

  fileContent = fetch(file)
  
  fileContent
end