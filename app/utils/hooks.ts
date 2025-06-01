"use client"

import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useTransaction } from 'wagmi';
import { USDC_ADDRESS, USDC_ABI, formatUSDCAmount } from './usdc';
import { PROJECT_ADDRESS, PROJECT_ABI, formatAmount } from './contracts';

export function useUSDCBalance() {
  const { address } = useAccount();
  const { data: balance } = useContractRead({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: [address],
  });

  return balance ? Number(balance) / 1e6 : 0;
}

export function useProjectSupport() {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const { writeContract, data: hash } = useContractWrite();

  const { isLoading, isSuccess } = useTransaction({
    hash,
  });

  const handleSupport = () => {
    if (amount <= 0) return;
    writeContract({
      address: PROJECT_ADDRESS,
      abi: PROJECT_ABI,
      functionName: 'support',
      args: [formatAmount(amount), message],
    });
  };

  return {
    amount,
    setAmount,
    message,
    setMessage,
    handleSupport,
    isLoading,
    isSuccess,
  };
}

export function useProjectStats() {
  const { data: totalSupport } = useContractRead({
    address: PROJECT_ADDRESS,
    abi: PROJECT_ABI,
    functionName: 'getTotalSupport',
  });

  const { data: supporters } = useContractRead({
    address: PROJECT_ADDRESS,
    abi: PROJECT_ABI,
    functionName: 'getSupporters',
  });

  return {
    totalSupport: totalSupport ? Number(totalSupport) / 1e6 : 0,
    supporters: supporters || [],
  };
}

export function useAudioPlayer(audioRef: React.RefObject<HTMLAudioElement>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = (Number(e.target.value) / 100) * duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const vol = Number(e.target.value);
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return {
    isPlaying,
    duration,
    currentTime,
    volume,
    muted,
    togglePlay,
    handleSeek,
    handleVolume,
    toggleMute,
  };
} 