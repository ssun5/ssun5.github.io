---
title: "Closing the Loop: Visual-Tactile Feedback for Robotic Grippers"
tags: ["control"]
date: '2026-04-05'
---
<h1 class="mt-0 pt-0 about_title">{{ title }}</h1>
<i>Why high-fidelity touch is the next bottleneck for dexterous robots, and what insect compound eyes have to do with it.</i>

## Abstract

This review argues two things. First, that the deficit in robotic manipulation is, in significant part, a deficit of high-fidelity tactile sensing. Second, that the most exciting near-term path forward is through a biomimetic route: the optics of arthropod (e.g. insects, crustaceans) compound eyes. Vision-based tactile sensors already excel in the high-resolution regime, and compound-eye-inspired imaging gives us a credible way to make them thin, wide-area, and multi-aperture in ways that single-camera designs can't match. 

## The manipulation gap is a sensing gap
It is striking how often the introduction of robotic-manipulation papers open with the same sentiment. The DIGIT team writes that "robots are not yet capable of achieving the same level of manipulation dexterity as humans" and assigns blame to "the difficulty of precisely estimating contact forces."<a class="cite" href="#lambeta2020"></a> Li et al., demonstrating USB insertion with a Baxter, observe that vision-based servoing struggles "because the robot hand tends to occlude the mating surface" and that fiducials and force-only sensing are awkward substitutes.<a class="cite" href="#li2014"></a> Choi and colleagues, working a decade and a half earlier on the SKUU Hand II, identify "the limitations in the hardware as well as the algorithms for signal processing" as the gating concern for tactile sensing.<a class="cite" href="#choi2006"></a>

Read together, they point to the same issue: to do anything precise with a held object, a robot needs a stream of high-resolution, low-latency, contact-localized data of the kind a human gets from skin. Vision alone is too easily occluded, and stuggles with measurment noise in uncontrolled environment — the kind of environment expected in real world manipulation tasks. Force-torque sensing at the wrist is too aggregated and pressure-sensitive arrays of taxels (tactile pixels), the dominant solution through the 2010s, are too coarse and too dependent on the chemistry of their conductive elastomers.

<br>
<img class="center" src="/assets/img/visual_tactile/digit_hand.png" alt="DIGIT visual-tactile">
<p class="fig_caption">The DIGIT vision-based tactile sensor mounted on an Allegro multi-finger hand, manipulating a glass marble. The colored ring-light visible at each finger is the GelSight-style internal illumination that turns the contact problem into a vision problem. Source: Lambeta et al.<a class="cite" href="#lambeta2020"></a></p>
<br>


## The vision-based tactile sensor
The breakthrough that reframed this problem was simple: replace the array of discrete taxels with a camera looking at a single compliant skin and read deformations at optical resolution rather than at the coarse pitch of taxel grids. 

Johnson and Adelson introduced this formulation in 2009. Their device layered clear elastomer with a reflective skin that conforms under contact; imaging through the elastomer captures a relief replica of the surface, and photometric stereo tailored to the hardware reconstucts surface texture and shape.<a class="cite" href="#johnson2009"></a>

Fingertip GelSight packaged the principle at 640$\times$480 pixels and 0.024 mm/pixel,<a class="cite" href="#yuan2017"></a> roughly two orders of magnitude finer than the capacitive arrays it competed with. From that blueprint, an entire family of GelSight sensors emerged.

<br>
<div class="overflow-hidden rounded-xl w-fit mx-auto">
<img class="center max-h-[40rem]" src="/assets/img/visual_tactile/wedge_gelsight.png" alt="wedge_gelsight">
</div>
<p class="fig_caption">The GelSight Wedge sensor, optimized for compactness. The wedge geometry slips into small gaps that bulkier sensors can't reach. Source: Adapted from Wang et al.<a class="cite" href="#wang2021"></a></p>
<br>

The downstream demonstrations are persuasive. Li et al. used GelSight tactile maps and feature-based RANSAC to localize a USB connector held in a Baxter's gripper accurately enough to perform the insertion <i>without</i> external visual feedback on the connector tip.<a class="cite" href="#li2014"></a> Dong, Yuan, and Adelson redesigned the illumination and gel surface to make geometry recovery quantitative, then applied it to slip detection across 37 everyday objects, using both relative motion on the membrane and the shear distortion as cues.<a class="cite" href="#dong2017"></a> Wang et al.'s GelSight Wedge proved that the photometric requirement could be met inside a finger geometry slim enough to slide between a plate and a table.<a class="cite" href="#wang2021"></a> The DIGIT team open-sourced a low-cost variant that mounts on multi-finger hands and trained tactile-MPC controllers to manipulate glass marbles in-hand.<a class="cite" href="#lambeta2020"></a>

It is worth highlighting the impact of these studies from the policy-learning angle. This generation of sensors, in addition to recovering highly sensitive and reliable data, facilitate their own integration because *their output is an image*. An image output slots directly into the same convolutional and transformer-based architectures we already use for computer vision, allowing rapid scaling of tactile-conditioned policy learning.

## Two constraints the field still hasn't solved
### Constraint A: Form factor
A camera with a useful field of view, working focal distance, and an elastomer in front of it is a thick package. A typical GelSight fingertip is bigger than the human distal phalanx it is meant to mimic. The DIGIT Pinki team, attacking this problem directly, used coherent fiber-optic bundles to relay both illumination and image out of a 15 mm-diameter tip — finally smaller than a US dime — while putting electronics and camera remote.<a class="cite" href="#di2024"></a> They reported 0.22 mm spatial resolution with 5 mN force sensitivity, and used the resulting probe for prostate palpation in phantoms and <i>ex vivo</i> tissue. While the results of this research is a feat of engineering, with demonstrated utility on real tissue, the underlying optical problem remains: "How do we get a camera close to the contact surface without a long optical path?" This is the central engineering issue and has not yet been solved in a general way.

<br>
<img class="center" src="/assets/img/visual_tactile/digit_pinki.png" alt="digit_pinki">
<p class="fig_caption">DIGIT Pinki uses coherent fiber-optic bundles to push the camera and electronics out of the fingertip, significantly shrinking the fingertip size while achieving a 15mm sensing diameter. Sub-millimeter coin texture is visible in the raw image, demonstrating that the optical relay does not destroy spatial fidelity. Source: Di et al., 2024 <a class="cite" href="#di2024"></a></p>
<br>


### Constraint B: Coverage along the finger
Even where a fingertip sensor is full-featured, a robotic grasp with a single fingertip sensor can only reason about whichever part of the object touched the tip. Human enveloping grasps by contrast engage the volar surface from tip to palm, with full-featured sensors along the entire length. Liu, Yañez, and Andelson's GelSight EndoFlex confronts this by incorporating two cameras per finger, covering the front and side surfaces of a 3-finger soft endoskeletal gripper, so a single enveloping grasp lights up a large fraction of the contact surface.<a class="cite" href="#liu2023"></a> They further demonstrated that a neural net trained on these multi-camera tactile images can classify objects from one grasp instead of requiring multiple regrasps. But the architecture — one small camera per region, gel cast onto a curved surface with internal lights — is awkward to scale.

</br>
<div class="mx-auto flex flex-row w-full md:w-[clamp(24rem,80%,50rem)] h-min gap-2 justify-between">
<div class="flex flex-auto min-h-full w-fit basis-0">
    <img class="w-auto h-full rounded-xl" src="/assets/img/visual_tactile/endoflex.png" alt="Endoflex gripper"/>
</div>
<div class="flex flex-auto flex-col gap-2 min-h-full w-fit justify-between basis-5">
    <img class="w-full h-auto rounded-xl" src="/assets/img/visual_tactile/endoflex_diagram.png" alt="Endoflex diagram"/>
    <img class="w-full h-auto rounded-xl" src="/assets/img/visual_tactile/endoflex_fab.png" alt="Endoflex fab"/>
</div>
</div>
<p class="fig_caption">Liu et al. gel casted two cameras for each gripper finger, enabling tactile feedback over large contact areas. Source: Liu et al., 2023 <a class="cite" href="#liu2023"></a></p>
<br>

## Through insect eyes
Let us take a small detour to exame a solution, which Nature has generated, that tackles the key challenges we face in this application.

After half a billion years or so of selection, the compound eye has become the dominant visual organ on Earth. Arthropods, including insects, crustaceans, and many other invertebrates, have converged on this design that enable their survival across an enourmous diversity of environments. Insects alone occupy almost all terrestrial environments. Their success arguably attributed to the development of the compound eye.  

The compound eye — composed of many individual photoreceptors, called *ommatidia*, packed tightly together to form the surface of the eye — solves a specific problem: how do you build a wide-field, motion-sensitive, distortion-tolerant imager out of cheap parts, in a small volume? 

Each of the hundreds-to-thousands of ommatidia in a compound eye captures only a narrow cone of angles; however, arranged together on a curve, they grant a panoramic field of view in a thin package. Furthermore, each aperture has a low Fresnel number and so very low optical aberration; small photodetectors close to small lenses gives low latency; and the parallax between adjacent ommatidia natively gives depth cues. Crucially, each ommatidium captures a few-pixels-wide measurement — the system as a whole is sparse and recovers its acuity through computation downstream. It is evident that the case for compound-eye-style imaging deserves our attention in building visual-tactile sensors. 

### Fabrication
The fabrication of microlenses is an evolving field. In recent years, manufacturers have begun releasing wafer-level camera modules. These employ semiconductor manufacturing techniques to fabricate and bond lenses to image sensors directly at the wafer-level. While these may prove useful in visual-tactile sensing applications in the future, in near-term, it is valuable to explore other fabrication routes that offer tighter iteration loops and better accessibility during the prototyping phase. We therefore look at some published work addressing fabrication of microlenses, specifically, fabricating microlens optics that are compatible with commercially available image sensors.

Jeong et al.'s 2006 work sheds light on this subject through reconfigurable microtemplating — polymer replication using the deformed elastomer membrane with microlens patterns — and self-writing in photosensitive resin to put hexagonally packed microlenses on a hemispherical dome with self-aligned waveguides.<a class="cite" href="#jeong2006"></a>

<br>
<div class="overflow-hidden rounded-xl w-fit mx-auto">
<img class="center max-h-[40rem]" src="/assets/img/visual_tactile/jeong_ommatidia.png" alt="Jeong artificial CE">
</div>
<p class="fig_caption">
Natural and biomimetic ommatidia, side by side. Each natural ommatidium pairs a facet lens with a crystalline cone and a waveguiding rhabdom. The artificial analogue, fabricated in polymer, replaces these with a microlens, a polymer cone, and a self-aligned waveguide. Source: Jeong, Kim & Lee, Science, 2006<a class="cite" href="#jeong2006"></a>
</p>
<br>

Lin et al. in 2018 demonstrated three-dimensional artifical compound eyes via two-photon polymerization (TPP), complete with a co-fabricated pinhole array, validating ray-tracing predictions of wider FOV and higher light utilization than planar microlens arrays.<a class="cite" href="#lin2018"></a> Hu et al. then went a step further with femtosecond two-photon-polymerized polymer compound eyes whose ommatidia have a logarithmic profile, which extends focal range enough to integrate the eye directly with a planar CMOS sensor without a curved focal plane. With 19 to 160 ommatidia, the system demonstrated large-FOV imaging (90$^\circ$) and sensitive spatial perception of moving targets. The study illustrates a practical route for integrating well-developed planar imaging sensors with the complex geometry of compound-eye micro-optics.<a class="cite" href="#hu2022"></a>

<br>
<img class="center" src="/assets/img/visual_tactile/hu_logarithmic_ce.png" alt="Hu logarithmic CE">
<p class="fig_caption"> Hu et al.'s logarithmic-profile microcompound eye permits direct optical integration with a planar CMOS sensor. Compare panel (c) (incomplete detection from spherical lenses defocusing on a flat plane) with panel (d) (extended detectable region with logarithmic lenses). Source: Hu et al., Nat. Commun., 2022.<a class="cite" href="#jeong2006"></a></p>

<br>
<img class="center" src="/assets/img/visual_tactile/hu_fig5.png" alt="hu fig5">
<p class="fig_caption">Hu et al.'s CE-camera as an on-chip microscope, monitoring the position and movement of microorganisms, highlighting its short working distance and sensitivity in spatial perception. Source: Hu et al., Nat. Commun., 2022.12<a class="cite" href="#hu2022"></a></p>
<br>

Dai et al. attacked the fabrication problem differently, using microfluidic-assisted 3D printing to build a biomimetic apposition compound eye in which microlens is connected to the planar surface of an imaging sensor through a zero-crosstalk refractive-index-matched waveguides that mimic the rhabdom. As a proof-of-concept demonstration, they captured full-color panoramic images and demonstrated 3D point-source tracking with a commercial image sensor.

<br>
<div class="mx-auto flex flex-row w-full md:w-[clamp(24rem,80%,50rem)] h-min gap-2 justify-between">
<div class="flex grow min-h-full w-fit basis-10">
    <img class="w-auto h-full rounded-xl" src="/assets/img/visual_tactile/dai_apposition_eye.png" alt="dai apposition eye">
</div>
<div class="flex flex-auto min-h-full w-fit basis-35">
    <img class="w-auto h-full rounded-xl" src="/assets/img/visual_tactile/dai_microfluidic_ce.png" alt="Dai et al. microfluidic compound eye">
</div>
</div>
<p class="fig_caption">Dai et al achieved uniform surface curvature of the ommatidia via microfluidic-assisted formation of the mould. Liquid resin is deposited in the cavities (microholes) of the intermediate mould, which when spun, ejects a portion of the liquid resin. Once the spinning process comes to rest, the remaining resin in the cavities take on curvatures determined by surface tension, producing uniform curvature and surface finish, which is then cured with UV light to finalize the mould. Source: Dai et al., 2021 <a class="cite" href="#dai2021"></a></p>
<br>

What makes the most recent work especially interesting for our purposes is that it begins to close the loop with downstream computation. Long et al.'s 2025 system pairs a biomimetic compound-eye camera (4.3 megapixel effective, 165$^\circ$ viewing angle, 40 $\mu m$ resolving power) with a multistage neural network that performs image reconstruction, 3D position prediction, classification, and pattern recognition simultaneously.<a class="cite" href="#long2025"></a> The mosaic image — sparse, low-resolution per-ommatidium — becomes the input to a learned data reconstruction pipeline.

<br>
<img class="center" src="/assets/img/visual_tactile/long_ce.png" alt="long ce">
<p class="fig_caption">Long et al.'s AI-assisted biomimetic compound-eye system. The mosaic-like raw output of an artificial compound eye is upgraded by a multistage neural network into high-fidelity panoramic images, 3D positions, and classification labels. Reproduced from Long et al., Sci. Adv., 2025.
<a class="cite" href="#long2025"></a></p>
<br>

## Compound-eye tactile sensors
The natural argument from this point becomes obvious: integrating biomimetic compound-eye optics into vision-based tactile sensing. Zhang et al.'s 2022 multidimensional tactile sensor is the paper that fuses them, and precisely helps support the argument. They construct a tactile sensor whose imaging system is explicitly compound-eye-inspired: an array of vision units, each with its own narrow-FOV optical path, looking through an elastic touching interface. The result is, in their words, "a thin vision-based tactile sensor" with a deformation resolution as high as 1016 dpi over a 5$\times$8 mm<sup>2</sup> sensing area, three-dimensional force measurement at 0.018 N tangential and 0.213 N normal accuracy, real-time processing at 30 Hz, and a total thickness of just 5 mm.

<br>
<img class="center" src="/assets/img/visual_tactile/zhang_pinhole_ce.png" alt="zhang ce">
<p class="fig_caption">Zhang et al. designed a vision-based tactile sensor whose internal optics are explicitly modeled on an apposition compound eye: an array of narrow-FOV imaging units replaces the single bulky camera of a GelSight-style sensor, and the whole package becomes thin enough to live on a fingertip. Source: Zhang et al., Soft Robotics, 2022.<a class="cite" href="#zhang2022"></a></p>

<img class="center" src="/assets/img/visual_tactile/zhang_application.png" alt="zhang ce application">
<p class="fig_caption">A textured compliant skin, a pinhole array (the "ommatidia"), and a single underlying CMOS sensor. Each pinhole-aperture pair sees a small region of the deformation; the system stitches them into a full sensing area. The thickness budget is dominated by the CMOS, not the optics — exactly the inversion of the GelSight bottleneck. Source: Zhang et al., Soft Robotics, 2022.<a class="cite" href="#zhang2022"></a></p>
<br>

I think it's worth being explicit about why this design matters even more than the per-paper numbers suggest. A conventional GelSight sensor is, optically, a single-aperture macro photograph of a piece of rubber. Its thickness is set by the focal distance of one lens. A compound-eye-inspired tactile sensor replaces that single aperture with an array of small ones, each with a short focal distance. The result is that the dominant constraint on the tactile sensor packaging is suddenly relaxed.

And the upside is more than just a "thinner GelSight." A multi-aperture optical front end gives several things a single camera doesn't:
<ol>
<li>
<em>Native parallax:</em> Adjacent ommatidia see slightly displaced images of the deformed skin, which means depth cues fall out of the geometry without needing photometric stereo's calibrated lighting.
</li>
<li>
<em>Engineered redundancy:</em> If one aperture fails, glares, or is occluded, neighboring units carry the signal — the way a partially blinded insect still sees.
</li>
<li>
<em>Temporally rich motion sensing:</em> Insect compound eyes are famously sensitive to motion (the "flicker effect") because each ommatidium can be toggled on or off as an object moves through their field of view.<a class="cite" href="#zhang2020"></a> During this, individual ommatidium may simply detect changes in light intensity reducing visual processing load while boosting reaction speed. The same property would let a tactile sensor detect incipient slip from sub-millimeter changes — useful, given that slip detection is half the demand of dexterous grasping.<a class="cite" href="#wang2021"></a>
</li>
<li>
<em>Wide angular coverage:</em> A curved compound-eye-inspired sensor wraps a finger naturally; a single-camera GelSight does not.
None of this is hypothetical at the optics layer. Hu et al. and Dai et al. have both shipped working compound-eye cameras that integrate with planar CMOS sensors;<a class="cite" href="#lin2018"></a><a class="cite" href="#hu2022"></a> Long et al. have shown that AI-assisted reconstruction recovers high effective resolution from sparse mosaic input;<a class="cite" href="#long2025"></a> Zhang et al. have demonstrated that the tactile-sensor variant is buildable.<a class="cite" href="#zhang2022"></a> 
</li>
</ol>
What's missing is a sustained engineering campaign that puts these pieces together at the scale of a robotic finger.

## Other useful reference points
Soft on-lens sensors. Getschmann and Echtler's LensLeech is a soft silicone cylinder that sits on top of any camera lens and acts itself as a close-focus optic; deformations of the silicone are read out as marker-pattern shifts.<a class="cite" href="#getschmann2023"></a> It is built for HCI, not robotics, but the underlying idea — the deformable element is the lens — suggests a direction in which the elastomer skin and the imaging optics of a tactile sensor merge into one component, removing yet another layer in the thickness stack.

Motion sensing without imaging. Zhang et al.'s 3D-printed compound-eye motion sensor uses simple light-intensity sensors rather than CMOS arrays, exploiting the flicker effect to detect distance and speed of a moving target with under 2% error.<a class="cite" href="#zhang2020"></a> This study specifically demonstrates how a ommatidia-based tactile sensor could grant low-bandwidth, low-latency response for slip detection.

I'll also note Choi et al.'s SKKU Hand II as a sober counterpoint.<a class="cite" href="#choi2006"></a> It used a PVDF strip plus pressure-variable resistor ink rather than camera-based sensing, and remains a useful reminder that many manipulation tasks — slip onset detection in particular — can be solved by clever non-vision-based sensing where vision-based sensing would be overkill or impractical. The right answer for a real gripper is probably multi-modal: a vision-based tactile patch where high resolution matters, supplemented by piezoelectric or capacitive elements for cheap, fast slip alarms.

## Open problems
Here is a list of research areas that I would like to push, roughly in priority order:
<ol>
<li><em>A finger-scale compound-eye tactile sensor:</em> Zhang et al. shows that it works at fingertip scale.<a class="cite" href="#zhang2020"></a> The next step is developing a sensor that wraps an entire phalanx, with hundreds of ommatidia mapping the curved contact surfaces to commercially available planar image sensors. Recall that logarithmic-profile ommatidia in the Hu et al. would allow us to use planar CMOS readout and skip the curved-detector problem</li>
<li><em>Learned reconstruction native to the sensor:</em> Long et al.'s multistage neural network for compound-eye image reconstruction is a strong template.<a class="cite" href="#long2025"></a> A compound-eye tactile sensor will also produce a sparse, mosaic-like raw output and will benefit from a learned pipeline that takes that mosaic, recovers high-effective-resolution deformation maps, infers force vectors, and flags slip events — ideally in a way co-designed with the downstream policy.</li>
<li><em>Manufacturability:</em> The 3D-printed and two-photon-polymerized compound eyes that exist today are research artifacts. A robotic finger that actually ships needs a fabrication route. Aside from semiconductor fabrication, in the near future this is probably some combination of UV-mask photocuring of the lens array<a class="cite" href="#dai2021"></a> with microfluidic-assisted printing of waveguides<a class="cite" href="#wang2022"></a> that produces consistent ommatidia at tens-of-dollars-per-finger pricing.</li>
<li><em>FPS:</em> Vision-based tactile sensors are limited in FPS due to large data streams. While we can expect this constraint to relax with time as computation becomes cheaper in accordance with Moore's Law, the compound-eye-based imaging technique offers a pathway to higher FPS and faster reaction to motion without increasing processing power. I alluded to it earlier — the "flicker effect" — the compound eye natively segments the spacial environment in finger pad, trading resolution for speed in detecting motion. This is especially relevant in context of detecting incipient slips.</li>
</ol>

## References
<ol class="references">
<li id="lambeta2020">M. Lambeta, P.-W. Chou, S. Tian, B. Yang, et al., <em>DIGIT: A novel design for a low-cost compact high-resolution tactile sensor with application to in-hand manipulation</em>, IEEE Robotics and Automation Letters, 5(3):3838–3845, 2020, arXiv:2005.14679.</li>
<li id="li2014">R. Li, R. Platt, W. Yuan, A. ten Pas, N. Roscup, M. A. Srinivasan, E. Adelson, <em>Localization and manipulation of small parts using GelSight tactile sensing</em>. In IEEE/RSJ IROS, Chicago, 2014, pp. 3988–3993.</li>
<li id="choi2006">B. Choi, S. Lee, H. R. Choi, S. Kang, <em>Development of anthropomorphic robot hand with tactile sensor: SKKU Hand II</em>. In IEEE/RSJ IROS, Beijing, 2006, pp. 3779–3784.</li>
<li id="johnson2009">M. K. Johnson and E. H. Adelson, <em>"Retrographic sensing for the measurement of surface texture and shape,"</em> 2009 IEEE Conference on Computer Vision and Pattern Recognition, Miami, FL, USA, 2009, pp. 1070-1077, doi: 10.1109/CVPR.2009.5206534. </li>
<li id="yuan2017">W. Yuan, S. Dong, and E. Adelson, <em>“GelSight: High-Resolution Robot Tactile Sensors for Estimating Geometry and Force,”</em> Sensors, vol. 17, no. 12, p. 2762, Nov. 2017, doi: https://doi.org/10.3390/s17122762.</li>
<li id="wang2021">S. Wang, Y. She, B. Romero, E. Adelson, <em>GelSight Wedge: Measuring high-resolution 3D contact geometry with a compact robot finger</em>, arXiv:2106.08851, 2021.</li>
<li id="dong2017">S. Dong, W. Yuan, E. H. Adelson, <em>Improved GelSight tactile sensor for measuring geometry and slip</em>, arXiv:1708.00922, 2017.</li>
<li id="di2024">J. Di, Z. Dugonjic, W. Fu, T. Wu, et al., <em>Using fiber optic bundles to miniaturize vision-based tactile sensors</em>, IEEE Transactions on Robotics, 2024 (DIGIT Pinki), arXiv:2403.05500.</li>
<li id="liu2023">S. Q. Liu, L. Z. Yañez, E. H. Adelson, <em>GelSight EndoFlex: A soft endoskeleton hand with continuous high-resolution tactile sensing</em>, arXiv:2303.17935, 2023.</li>
<li id="jeong2006">K.-H. Jeong, J. Kim, L. P. Lee, <em>Biologically inspired artificial compound eyes</em>, Science, 312:557–561, 2006.</li>
<li id="lin2018">J. Lin, Y. Kan, X. Jing, M. Lu, <em>Design and fabrication of a three-dimensional artificial compound eye using two-photon polymerization</em>, Micromachines, 9(7):336, 2018.</li>
<li id="hu2022">Z.-Y. Hu, Y.-L. Zhang, C. Pan, J.-Y. Dou, et al., <em>Miniature optoelectronic compound eye camera</em>, Nature Communications, 13:5634, 2022.</li>
<li id="dai2021">B. Dai, L. Zhang, C. Zhao, H. Bachman, et al., <em>Biomimetic apposition compound eye fabricated using microfluidic-assisted 3D printing</em>, Nature Communications, 12:6458, 2021 (plus supplementary materials).</li>
<li id="long2025">Y. Long, B. Dai, C. Chang, N. Upreti, et al., <em>Seeing through arthropod eyes: An AI-assisted, biomimetic approach for high-resolution, multi-task imaging</em>, Science Advances, 11:eadt3505, 2025.</li>
<li id="zhang2022">Y. Zhang, X. Chen, M. Y. Wang, H. Yu, <em>Multidimensional tactile sensor with a thin compound eye-inspired imaging system</em>, Soft Robotics, 9(5), 2022.</li>
<li id="zhang2020">B. Zhang, G. Chen, M. M.-C. Cheng, J. C.-M. Chen, Y. Zhao, <em>Motion detection based on 3D-printed compound eyes</em>, OSA Continuum, 3(9):2553, 2020.</li>
<li id="getschmann2023">C. Getschmann, F. Echtler, <em>LensLeech: On-lens interaction for arbitrary camera devices</em>, arXiv:2307.00152, 2023.</li>
<li id="wang2022">S. Wang, T. Li, T. Liu, Y. Xu, Z. Liu, Y. Chen, Z. Weng, Z. Wang, <em>Fabrication of bionic compound eye lens by 3D printing and UV mask curing</em>. In IEEE 3M-NANO, 2022.</li>
<li>Viollet, S.; Godiot, S.; Leitel, R.; Buss, W.; Breugnon, P.; Menouni, M.; Juston, R.; Expert, F.; Colonnier, F.; L'Eplattenier, G.; et al. <em>Hardware Architecture and Cutting-Edge Assembly Process of a Tiny Curved Compound Eye</em>. Sensors 2014, 14, 21702-21721. https://doi.org/10.3390/s141121702</li>
<li id="keum2018">D. Keum, K.-W. Jang, D. S. Jeon, C. S. H. Hwang, E. K. Buschbeck, M. H. Kim, K.-H. Jeong, <em>Xenos peckii vision inspires an ultrathin digital camera</em>, Light: Science & Applications, 7:80, 2018.</li>
<li id="kim2015">Y.-J. Kim, <em>Design of low inertia manipulator with high stiffness and strength using tension amplifying mechanisms</em>. In IEEE/RSJ IROS, Hamburg, 2015 (cited as background on the arm-side complement to dexterous tactile sensing).</li>
<li id="lee2013">J. Lee, Y.-J. Kim, S.-G. Roh, et al., <em>Tension propagation analysis of novel robotized surgical platform for transumbilical single-port access surgery</em>. In IEEE/RSJ IROS, Tokyo, 2013 (tendon-driven manipulation, related context).</li>
</ol>
