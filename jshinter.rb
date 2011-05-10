require 'rubygems'
require 'sinatra'
require 'open-uri'
require 'net/http'
require 'erb'

set :public, File.dirname(__FILE__) + '/static'

get '/' do
  erb :index
end

get '/file/*.js' do |file|
  def fetch(file, limit = 10)
    # You should choose better exception.
    raise ArgumentError, 'HTTP redirect too deep' if limit == 0

    response = Net::HTTP.get_response(URI.parse(file))
    case response
      when Net::HTTPSuccess     then response.body
      when Net::HTTPRedirection then fetch(response['location'], limit - 1)
    else
      response.code
    end
  end
  fetch(file + '.js')
end