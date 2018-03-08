class Api::ItemsController < ApplicationController
  def index
    render json: Trip.all
  end

  def create
    item = Trip.new(trip_params)
    if trip.save
      render json: trip
    else
      render json: { errors: trip.errors }, status: :unprocessable_entity
    end
  end

  #def update
    #trip = Trip.find(params[:id])
    #come back to this
    #render json: trip
  #end

  def destroy
    Trip.find(params[:id]).destroy
    render json: { message: 'Trip deleted' }
  end

  private

  def trip_params
    params.require(:trip).permit(:name)
  end

end
