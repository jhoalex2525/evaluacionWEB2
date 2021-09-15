<?php include_once("../static/layouts/header.php"); ?>
<div class="row rowcarousel">
  <div class="carousel slide" data-bs-touch="false" data-bs-interval="false" id="carouselExampleControlsNoTouching">
      <div class="carousel-inner" id="fila">
          <div class="carousel-item active">
              <div class="carousel-caption d-none d-md-block">
                <h5>Alexander Ryback</h5>
              </div>
              <img src="../img/foto18.jpg" alt="foto18" id="foto18" class="d-block w-100">            
          </div>
          
      <!-- <div class="row row-cols-1 row-cols-md-3 g-4" id="fila">
          </div> -->
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</div>
<?php include_once("../static/layouts/footer.php"); ?>