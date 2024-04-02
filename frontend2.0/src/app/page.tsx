import 'public/assets/css/bootstrap.min.css';


export default function Home(){
    return (
   <body>

<section className=" pt-5 pb-6" style={{backgroundColor:'#7868F4'}}>
    <div className="container text-white">
        <div className="row">
            <div className="col-12 d-flex flex-row align-items-center justify-content-between">
                <div className="heading-brand">Blu.</div>
                <a href="/app/dashboard" className="btn btn-dark" >Dashboard</a>
            </div>
        </div>
        <div className="row mt-6">
            <div className="col-md-8 mx-auto text-center text-">
                <h1 className='text-white'>The World's First Carbon and Water Neutral AI</h1>
                <p className="lead mb-5">Blu audits your carbon and water usage through API calls and scans your codebase to make your code environmentally conscious.</p>
              
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-md-9 mx-auto">
                <div className="code-window">
                    <div className="dots">
                        <div className="red"></div>
                        <div className="orange"></div>
                        <div className="green"></div>
                    </div>

                    <img src="" alt="" />
                    
                </div>
            </div>
        </div>
    </div>
</section>





<footer className="py-5 bg-light">
    <div className="container">
        <div className="row">
            <div className="col-12 text-center">
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="https://github.com/mnshah0101/bluai">Github</a></li>
                </ul>
            </div>
        </div>
        <div className="row my-2">
            <div className="col-md-4 mx-auto text-muted text-center small-xl">
                &copy; 2024 Blu. - All Rights Reserved
            </div>
        </div>
    </div>
</footer>

</body>
        
    )

}