{
  description = "jgero.me webpage";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, treefmt-nix }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
      };
      treefmtEval = treefmt-nix.lib.evalModule pkgs ./treefmt.nix;
    in
    {
      formatter.${system} = treefmtEval.config.build.wrapper;
      checks.${system}.formatter = treefmtEval.config.build.check self;
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs;[
          cargo
          rustc
        ];
      };
      packages.${system} = {
        default = pkgs.rustPlatform.buildRustPackage {
          pname = "jgero-me-webpage";
          version = "0.2.0";
          src = ./.;
          cargoHash = "sha256-Jt2x9QZyVJt9Apk89HHOluJoUPcpLpaS6Fxz48ees+g=";
        };
      };
    };
}
