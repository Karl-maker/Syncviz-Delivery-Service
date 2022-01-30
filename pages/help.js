import Link from "next/link";

function Help() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 m-0  container-fluid">
          {/*

                RightHandSide

                */}

          <div className="col-12 m-0 ">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Help
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-12 m-0 ">
            <h1>Help</h1>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12  m-0 container">
          {/*

                LeftHandSide

                */}
          <div className="row">
            <div className="col-12 m-0 "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
