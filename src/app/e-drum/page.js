'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './e-drum.css';
import Header from '../components/Header';
import Image from 'next/image';
import FarImg from './E_Drum_Far.jpg';
import ClosupImg from './E_Drum_Closeup.jpg';
import WaveformImg from './Waveform.png';
import STFTImg from './STFT.png';
import OrigReconSTFT from './Original-vs-reconstructed_STFT.png';

const EDrumPage = () => {
	const [loading, setLoading] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setLoading(false);
	}, []);

	const handleNavigation = (url) => {
		setIsTransitioning(true);
		setTimeout(() => {
			router.push(url);
		}, 500);
	};

	return (
		<div className="">
			<Header />
      <div className={`content-container ${isTransitioning ? 'fade-out' : ''}`}>
				{!loading && (
					<div>
						{/* Title block */}
            <div class="flex justify-center gap-2 pt-10 py-10">
              <h1 className={`content-center text-center text-nowrap font-dosis text-5xl sm:text-7xl md:text-8xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
								E-Drum
							</h1>
              <h1 className={`text-center font-dosis text-8xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
								|
							</h1>
							<div className="flex content-center">
                <div className='font-dosis inline-block content-center text-xs sm:text-tiny md:text-base lg:text-lg'>
									2025 — Ongoing<br />
									Tools Used:<br />
                  Solidworks, 3D Printing, Python<br/>
                  PyTorch, librosa, NumPy, Optuna
								</div>
							</div>
						</div>

						<div className="inline-block w-full flex-shrink-0 flex-wrap">

							{/* Tagline */}
							<div className="max-w-3xl mx-auto text-center font-dosis text-lg mt-4">
								<p className="italic">A physical electronic drum instrument with neural-network–generated audio — more expressive and realistic than any conventional triggered e-drum.</p>
							</div>

							{/* Hero image — far shot of the drum */}
							<div className="flex justify-center mt-10">
								<Image
									src={FarImg}
									alt="E-Drum full view"
									width={1200}
									height={800}
									className="rounded-md w-full max-w-4xl object-cover"
									unoptimized
								/>
                
							</div>
							<div className="max-w-3xl mx-auto text-center font-dosis text-lg mt-1">
								<p>Custom Sampling Robot</p>
							</div>
							{/* Vision */}
							<h2 className="mt-10 content-center text-center text-nowrap font-dosis text-3xl sm:text-4xl md:text-5xl font-thin text-text tracking-wide py-5">
								Vision
							</h2>
							<div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit mx-auto">
								Traditional electronic drums trigger pre-recorded samples — every hit sounds identical regardless of how it is played. This project replaces that playback model with a generative one: a physical cymbal pad whose strikes are encoded into a compact latent space and decoded into realistic audio on the fly via the Web Audio API. The result is a drum instrument that responds expressively to nuance in every hit.
							</div>

							{/* Closeup + Demo */}
							<h2 className="mt-10 content-center text-center text-nowrap font-dosis text-3xl sm:text-4xl md:text-5xl font-thin text-text tracking-wide py-5">
								Sampling Demo and Closeup
							</h2>
              <div className="max-w-4xl mx-auto font-dosis">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                  {/* Image */}
                  <div className="text-center">
                    <div className="w-full h-[350px] md:h-[420px] relative">
                      <Image
                        src={ClosupImg}
                        alt="E-Drum closeup"
                        fill
                        className="rounded-md object-cover"
                        unoptimized
                      />
                    </div>
                    <p className="text-sm mt-2">Closeup of the end-effector assembly</p>
                  </div>

                  {/* Video */}
                  <div className="text-center">
                    <div className="w-full h-[350px] md:h-[420px]">
                      <video
                        controls
                        className="rounded-md w-full h-full object-cover"
                        src="/e-drum/E_Drum_Demo.mp4"
                      />
                    </div>
                    <p className="text-sm mt-2">Sample Acquisition Demo (sped up)</p>
                  </div>

                </div>
              </div><br />
              {/* Bridge: explain the hook in one breath */}
							<div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit mx-auto">
                  This project’s core trick is a <span className="italic">sampling robot</span> that produces a
                  labeled dataset of cymbal strikes (position, force, beater). That structure is what lets the
                  neural model generate expressive audio instead of repeating the same sample.
              </div>

							{/* ML Experiments */}
							<h2 className="mt-10 content-center text-center text-nowrap font-dosis text-3xl sm:text-4xl md:text-5xl font-thin text-text tracking-wide py-5">
								ML Experiments
							</h2>
							<div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit mx-auto">
								Before building any hardware, the viability of the generative approach was tested with two datasets. The first used randomly timed mic recordings of cymbal strikes with no metadata. The second incorporated piezoelectric sensors on the cymbal surface, providing onset timing and rough impact force per strike. Both datasets produced models that reconstructed audio plausibly on training data but failed to generalize: the strikes were too similar to one another, giving the model little variation to learn from and no reliable mapping between playing conditions and the resulting sound.{'\n\n'}
								These experiments confirmed that dataset structure is the core constraint. A model can only be as expressive as the data it learns from and unstructured recordings cannot capture the full parameter space of a cymbal strike.
							</div>

							{/* ML architecture detail */}
							<div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit mx-auto mt-6">
								Seven encoder architectures were explored across these experiments: a GRU-based sequence autoencoder, a 2D convolutional autoencoder, and five iterations of a convolutional architecture with progressively refined loss functions. Key milestones included switching to a log-magnitude + phase STFT representation (log₁₊|S| and phase/π), which proved far more stable to train than raw real/imaginary STFTs, and adding waveform-domain losses — L1, multi-resolution STFT, and onset-boost weighting — to better preserve transients. The final architecture is a Variational Autoencoder (VAE) with a KL-divergence term, enabling the latent space to be sampled rather than simply reconstructed. Hyperparameter optimization via Optuna achieved a best validation loss of 0.1036.
							</div>

              {/* Reconstruction comparison */}
                      <div className="max-w-4xl mx-auto py-8 font-dosis">
                      <div className="flex flex-col gap-6 items-center">

                        {/* Waveform + STFT side-by-side (wrap on very small screens) */}
                        <div className="text-center">
                        <Image src={WaveformImg} alt="Strike waveform" width={600} unoptimized />
                        <p className="text-sm mt-2">Strike waveform extracted from raw audio</p>
                        </div>
                        <div className="text-center">
                        <Image src={STFTImg} alt="STFT spectrogram" width={600} unoptimized />
                        <p className="text-sm mt-2">Log-magnitude STFT of the same strike</p>
                        </div>

                        {/* Recon image */}
                  <div className="text-center">
                    <Image src={OrigReconSTFT} alt="Original vs reconstructed STFT" unoptimized />
                    <p className="text-sm mt-2">Original vs reconstructed STFT</p>
                  </div>

                  {/* Audio players side-by-side, wrapping on zoom/phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                    <div className="text-center">
                      <audio controls src="/e-drum/Strike_37_original.wav" className="w-full" />
                      <p className="text-sm mt-2">Original strike</p>
                    </div>
                    <div className="text-center">
                      <audio controls src="/e-drum/Strike_37_reconstructed.wav" className="w-full" />
                      <p className="text-sm mt-2">Reconstructed from latent space</p>
                    </div>
                  </div>

                </div>
              </div>

							{/* Sampling Robot */}
							<h2 className="mt-10 content-center text-center text-nowrap font-dosis text-3xl sm:text-4xl md:text-5xl font-thin text-text tracking-wide py-5">
								The Sampling Robot
							</h2>
							<div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit mx-auto">
								To produce the structured dataset the model needs, I built an automated sampling robot. The robot is constructed on a modified Ender 3 chassis with expanded range of motion, a replacement motherboard, and custom firmware. Stepper motors control striker position across the cymbal surface, and a high-torque motor winds a spring-loaded mechanism that releases at a precise force for each hit. Every strike is logged with position, force, and timestamp — so each recorded waveform maps directly to its actuation parameters.{'\n\n'}
								This produces a dataset with genuine, labeled variation across strike position, force, and beater type. With this structure, the model can learn a meaningful mapping from strike conditions to the resulting sound.
							</div>

							{/* Next steps */}
							<h2 className="mt-10 content-center text-center text-nowrap font-dosis text-3xl sm:text-4xl md:text-5xl font-thin text-text tracking-wide py-5">
								Next Steps
							</h2>
							<div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit mx-auto">
								The robot will be used to collect a new dataset with controlled variation across strike position, force, and beater type. The VAE will then be retrained on this data and used for low-latency inference in a real electronic cymbal.
							<br /><br /><br /></div>

						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default EDrumPage;