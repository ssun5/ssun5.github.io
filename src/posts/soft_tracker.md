---
title: Surface Referencing Against Deformable Soft Bodies
date: '2021-05-01'
---
<h1 class="mt-0 pt-0 about_title">{{ title }}</h1>
{{ title }}: A low-cost, optical based solution for positional tracking of medical device contact along human skin.

<div class="grid-container center">
    <img class="aspect-square object-cover object-top" src="/assets/img/soft_tracker/device_back.jpg" alt="device_view1">
    <img class="aspect-square object-cover" src="/assets/img/soft_tracker/device_top.jpg" alt="device_view2">
    <img class="aspect-square object-cover object-[25%_25%]" src="/assets/img/soft_tracker/device_and_markers.jpg" alt="device_view3">
    <img class="aspect-square object-cover" src="/assets/img/soft_tracker/measuring_foam_form.jpg" alt="device_view4">
</div>

# Introduction
Purpose: demonstrate feasibility of an optical positioning system
based on surface referencing of a deformable soft body
Application:
handheld (radiometer) scanner for breast cancer screening
need a method locating the point of contact on the skin
Requirements:
<ul>
<li>low cost: <$400</li>
<li>good accuracy: +/- 0.5mm</li>
<li>real-time</li>
</ul>

# Radiometer vs Existing Scanners
Standard approaches — X-ray mammography and ultrasound imaging — produce images of internal tissue structure.
Radiometer-based scanner only produces a heat map and no discernible ‘landmarks’.
Localization is necessary for biopsy.

<div class="multi-column-container">
    <div class="card">
        <div class="top-image aspect-[3/4]"><img class="object-cover scale-105 object-[90%_100%]" src="/assets/img/soft_tracker/mammogram_stock_image.jpeg" alt="X-ray Mammogram"></div>
        <div class="title">X-ray Mammogram</div>
        <p class="caption">Image of internal tissue structure can be used for localization of wire or needle for biopsy</p>
    </div>
    <div class="card">
        <div class="top-image aspect-[3/4]"><img class="object-cover scale-125" src="/assets/img/soft_tracker/ultrasound_stock_image.jpeg" alt="Ultrasound"></div>
        <div class="title">Ultrasound</div>
        <p class="caption">Image of internal tissue structure can be used for localization of wire or needle for biopsy</p>
    </div>
    <div class="card">
        <div class="top-image aspect-[3/4]"><img class="object-cover object-[25%_0%]" src="/assets/img/soft_tracker/heatmap_stock_image_adobe.jpeg" alt="Radiometer"></div>
        <div class="title">Radiometer</div>
        <p class="caption">Heat map image does not produce discernible information for localization.</p>
    </div>
</div>

# Motivation for Radiometer Approach
Keypoints for answering some FAQs

<div class="multi-column-container">
  <div class="card max-w-[30rem]">
    <div class="title">X-ray Mammography</div>
    <ul>
      <li>Low-level radiation</li>
      <li>Detection based on visible discrepancy of tissue structure or calcification</li>
      <li>Ages 30+</li>
      <li>Radiation exposure limits frequency of scans</li>
    </ul>
  </div>
  <div class="card max-w-[30rem]">
    <div class="title">Radiometer Imaging</div>
    <ul>
      <li>Passive sensing, no radiation exposure</li>
      <li>Can detect hot spots before sizable formation of tumors<b><sup>(*)</sup></b></li>
      <li>No age limit</li>
      <li>No limit on frequency of scans</li>
    </ul>
    <p class="text-xs"><b>(*)</b> theoretically, can detect tumors before they are visible to other imaging techniques</p>
  </div>
</div>

# Previous Localization Approaches
Previous approaches produced noisy/unstable localization as well as inadequate accuracy.
<div class="multi-column-container">
    <div class="card">
        <div class="top-image aspect-square"><img class="object-cover scale-110 origin-bottom" src="/assets/img/soft_tracker/imu_yost.jpeg" alt="IMU"></div>
        <div class="title">Inertial Measurement Unit</div>
        <ul class="caption grid-rows-none">
            <li>significant measurement drift</li>
            <li>Magnetometer compensator is susceptible to interference with nearby metal</li>
        </ul>
    </div>
    <div class="card">
        <div class="top-image aspect-square"><img class="object-cover scale-125" src="/assets/img/soft_tracker/structured_light_bowl.jpeg" alt="structured light"></div>
        <div class="title">Structured Light 3D Scan</div>
        <ul class="caption grid-rows-none">
            <li>From a 3rd person perspective, this method can produce a 3D scan & rendering of the entire scene.</li>
            <li>Unfortunately, the breast is not a rigid structure so a 3D snapshot is not a reliable solution.</li>
        </ul>
    </div>
    <div class="card">
        <div class="top-image aspect-square"><img class="object-cover scale-175 origin-[15%_20%]" src="/assets/img/soft_tracker/R_pad2_01.jpeg" alt="resistive film"></div>
        <div class="title">Resistive Film</div>
        <div class="caption">
            A resistive film is applied to the skin surface. Device contact happens on the film.
            Conformal to skin surface. Localization is adaptive to skin deformation. However, measurement is easily skewed by additional contact points (e.g. hand of user). Difficult to achieve high accuracy.
        </div>
    </div>
</div>

## Insights from Previous Attempts
Previous attempts were revealing as to how to design a better position tracking system.
<div class="multi-column-container text-center">
    <div class="card ring-transparent">
        <div class="top-image aspect-[5/4] bg-[var(--color-bg)]"><img class="invert object-contain" src="/assets/img/soft_tracker/soft_surface.png" alt="adaptive"></div>
        <div class="title">Adaptive</div>
        <p class="caption">
        Measurement approach should be adaptive to elastic nature of skin
        </p>
    </div>
    <div class="card ring-transparent">
        <div class="top-image aspect-[5/4] bg-[var(--color-bg)]"><img class="invert object-scale-down scale-90" src="/assets/img/soft_tracker/vision_icon.png" alt="vision"></div>
        <div class="title">Vision Based</div>
        <p class="caption">
        Vision-based approach achieves high-resolution at low cost
        </p>
    </div>
    <div class="card ring-transparent">
        <div class="top-image aspect-[5/4] bg-[var(--color-bg)]"><img class="invert object-scale-down origin-[0%_50%] scale-105" src="/assets/img/soft_tracker/proportional_triangle_1.png" alt="geometry"></div>
        <div class="title">Geometry</div>
        <p class="caption">
        Leverage physical proportions to achieve “high gain” measurement
        </p>
    </div>
</div>

# Concept: Camera On-Board
Observing key lessons learned from previous attempts, I produced concept sketches of a camera-on-board solution. Camera is mounted directly onto the device, and looks down on fiducial markers along the surface on which the device sits.
Direct referencing: Close coupling between essential parts of the system results in high robustness.
High gain geometry: Small physical perturbations correspond to large pixel movement.

<div>
<div class="img_container center aspect-[5/4] rounded-xl">
<img class="object-cover scale-150 origin-[0%_45%]" src="/assets/img/soft_tracker/concept_sketch.jpg" alt="concept sketch">
</div>
<p class="fig_caption">Concept sketch for a camera-on board system</p>
</div>

Interpolating between multiple fiducial markers on the skin surface enables position estimation along the surface even under strain.

<div>
<div class="img_container center aspect-[5/4] rounded-xl">
<img class="object-cover scale-140 origin-[90%_35%]" src="/assets/img/soft_tracker/interpolation_sketch.jpg" alt="interpolation sketch">
</div>
<p class="fig_caption">Simple interpolation technique</p>
</div>

## Components
Custom made components for the purpose of demonstrating the experimental system.

<div class="multi-column-container">
    <div class="card max-w-[40rem]">
        <div class="top-image aspect-square"><img class="object-cover origin-bottom" src="/assets/img/soft_tracker/breast_phantom.jpg" alt="breast phantom"></div>
        <div class="title">Breast Phantom</div>
        <p class="caption">
        Breast phantom is cast from gelatin with a similar formulation as ballistic gel — giving an elastic behavior analogous to human flesh.
        </p>
    </div>
    <div class="card max-w-[40rem]">
        <div class="top-image aspect-square"><img class="object-cover object-[30%_20%]" src="/assets/img/soft_tracker/device_and_markers.jpg" alt="device_view3"></div>
        <div class="title">Device, Camera, and Fiducial Markers</div>
        <p class="caption">
        Shown is a carefully dimensioned wooden block, representing the radiometer device. A camera is mounted on top as the observer. In the foreground are various sizes of fiducial markers. The smallest of which are used on the breast phantom.
        </p>
    </div>
</div>

## System in Action
The system fully assembled and in action.
Left: view of the system from a
3rd person perspective.
Right: perspective from the on-
board camera.

<div class="multi-column-container">
    <div class="card max-w-[40rem]">
        <div class="top-image aspect-square"><img class="object-cover scale-110 origin-[20%_80%] object-[25%_80%]" src="/assets/img/soft_tracker/Capture_phantom_measure2_b.jpeg" alt="system in action A"></div>
        <div class="title">Direct Referencing</div>
        <p class="caption">
        Mounting camera on-board produces position measurements that are closely coupled between device body & patient skin. Small physical perturbations correspond to large pixel movement.
        </p>
    </div>
    <div class="card max-w-[40rem]">
        <div class="top-image aspect-square"><img class="object-cover scale-110 origin-[80%_80%]" src="/assets/img/soft_tracker/Capture_phantom_measure2_a.jpeg" alt="system in action B"></div>
        <div class="title">Low cost; High resolution</div>
        <p class="caption">
        Even low-cost webcams are capable of sub-millimeter measurements when geometry of the system is appropriately leveraged. Cost of webcam, Logitech C920: $60
        </p>
    </div>
</div>

## Results
Purpose: demonstrate feasibility of an optical positioning system based on surface referencing of a deformable soft body

<ul>Requirements:
<li>low cost: <$400</li>
<li>good accuracy: +/- 0.5mm</li>
<li>real-time</li>
</ul>

<ul>
Results:
<li>cost of demo: $80</li>
<li>accuracy: +/- 0.5mm can be significantly improved by further tuning</li>
<li>real-time: fiducial markers require minimal run-time computation</li>
<li>works on a deformable surface</li>
<li>low cost of integration</li>
<li>total time of demo completion:
4hrs</li>
</ul>

# Appendix
A few tidbits for the observant audience.
<div class="card-container mathjax_ignore">
  <div class="card">
    <div class="top-container">
        <img class="card-image aspect-square object-cover object-top" src="/assets/img/soft_tracker/device_top.jpg" alt="device_top">
    </div>
    <div class="break"></div>
    <div class="bottom-container">
      <div class="title">Additional Markers</div>
      <div class="caption">Additional markers were placed on top of the device as one of the ways to extract ground truth in the experimental system.</div>
    </div>
  </div>
  <div class="card">
    <div class="top-container">
        <img class="card-image aspect-square object-cover object-[80%_50%]" src="/assets/img/soft_tracker/radial_measure1.jpg" alt="foam form">
    </div>
    <div class="break"></div>
    <div class="bottom-container">
      <div class="title">Rigid Foam Form</div>
      <div class="caption">In demonstration of how the system captures the unperturbed skin surface, a rigid foam form was used because it has a simple geometry which lends well to developing a ground truth model.</div>
    </div>
  </div>
  <div class="card">
    <div class="top-container">
        <img class="card-image aspect-square object-cover object-left" src="/assets/img/soft_tracker/anoto_pen_product.jpeg" alt="Anoto pen">
    </div>
    <div class="break"></div>
    <div class="bottom-container">
      <div class="title">Related Work</div>
      <div class="caption">Here is a product from 2009, by Anoto. The pen uses a small on-board camera to track fiducial markers on special paper in order to record handwriting.</div>
    </div>
  </div>
  <div class="card">
    <div class="top-container">
        <img class="card-image aspect-square object-cover object-left" src="/assets/img/soft_tracker/anoto_fiducial.gif" alt="Anoto fiducial markers">
    </div>
    <div class="break"></div>
    <div class="bottom-container">
      <div class="title">Related Work, continued</div>
      <div class="caption">The digital pen demonstrates the feasibility of miniaturization for the experimental method used in this project.</div>
    </div>
  </div>
  
</div>
