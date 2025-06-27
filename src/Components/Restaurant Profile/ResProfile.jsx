
function ResProfile() {



  return (
    <div className="flex flex-col bg-amber-50">
        <div className="flex flex-col items-center px-14 py-10 bg-green-100">
          <h1 className="text-4xl py-3">Name</h1>
          <h1 className="text-3xl">Rating</h1>
        </div>
        <div className="bg-fuchsia-100">

          <div className="flex flex-wrap gap-5 px-14 py-6">
            <div className="min-w-[200px] min-h-[300px] bg-white"></div>
            <div className="w-[200px] h-[300px] bg-white"></div>
            <div className="w-[200px] h-[300px] bg-white"></div>
          </div>

        </div>
        <div className="bg-emerald-200 ">
          <div className="bg-amber-100 flex flex-col items-center gap-3 py-10 px-14">
            <h1 className="text-3xl font-semibold py-2">Our Menu</h1>
             <div className="bg-white w-full flex flex-wrap gap-5 px-14 py-6 rounded-lg">

               <div className="w-[200px] h-[300px] px-3 py-3 bg-gray-200">
                <img src="" alt="img" />
                <h1>Name</h1>
                <div className="flex justify-between">
                  <h1>Old Rate</h1>
                  <h1>new Rate</h1>
                </div>
               </div>
               
             </div>
           
          </div>
        </div>

         <div className="bg-fuchsia-200 ">
          <div className="bg-amber-100 flex flex-col items-center gap-3 py-10 px-14">
            <h1 className="text-3xl font-semibold py-2">Feedback</h1>
             <div className="bg-white w-full flex flex-wrap gap-5 px-14 py-6 rounded-lg" >

               <div className="w-full flex justify-between items-center px-3 py-3 bg-gray-200">
                    <div className="flex items-center gap-4">
                      <img src="" alt="img" />
                      <div className="flex flex-col">
                        <h1>Name</h1>
                        <h1>Msg</h1>
                      </div>

                    </div>
                    <h1>Time</h1>
               </div>
               
             </div>
           
          </div>
          </div>
    </div>
  )
}

export default ResProfile
